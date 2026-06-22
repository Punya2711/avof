#!/usr/bin/env python3
"""
Comprehensive backend API tests for Avani Organics production-readiness improvements
Tests grouped products, variants, new order endpoint, Razorpay error paths, expanded CSV
"""
import requests
import json
import sys
import time

BASE_URL = "https://fresh-organics-dev.preview.emergentagent.com/api"
ADMIN_EMAIL = "admin@avaniorganic.com"
ADMIN_PASSWORD = "Avani@2025"

def print_test(name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} | {name}")
    if details:
        print(f"    {details}")
    print()

def test_grouped_products_default():
    """Test 1: GET /api/products — default returns GROUPED products"""
    print("=" * 80)
    print("TEST 1: GET /api/products (default grouped)")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/products", timeout=10)
        data = resp.json()
        
        products = data.get("products", [])
        total = data.get("total", 0)
        
        # Should be ~70-110 groups, not 164 flat products (104 unique product names is valid)
        is_grouped = 70 <= total <= 110
        
        # Check first product has grouped fields
        first = products[0] if products else {}
        has_variant_count = "variant_count" in first
        has_variants = "variants" in first and isinstance(first.get("variants"), list)
        has_min_price = "min_price" in first
        has_max_price = "max_price" in first
        
        # Find a product with multiple variants
        multi_variant = None
        for p in products:
            if p.get("variant_count", 0) > 1:
                multi_variant = p
                break
        
        passed = (
            resp.status_code == 200 and
            is_grouped and
            has_variant_count and
            has_variants and
            has_min_price and
            has_max_price and
            multi_variant is not None
        )
        
        print_test(
            "Grouped products (default)",
            passed,
            f"Status: {resp.status_code}, Total: {total} (expected 70-110), Has grouped fields: {has_variant_count and has_variants}, Multi-variant example: {multi_variant.get('name') if multi_variant else 'None'} with {multi_variant.get('variant_count') if multi_variant else 0} variants"
        )
        return passed
    except Exception as e:
        print_test("Grouped products (default)", False, f"Error: {str(e)}")
        return False

def test_flat_products():
    """Test 2: GET /api/products?grouped=false — returns flat list"""
    print("=" * 80)
    print("TEST 2: GET /api/products?grouped=false (flat list)")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/products?grouped=false", timeout=10)
        data = resp.json()
        
        products = data.get("products", [])
        total = data.get("total", 0)
        
        # Should be 164 flat products
        is_flat = total == 164
        
        passed = (
            resp.status_code == 200 and
            is_flat and
            len(products) == 164
        )
        
        print_test(
            "Flat products list",
            passed,
            f"Status: {resp.status_code}, Total: {total} (expected 164)"
        )
        return passed
    except Exception as e:
        print_test("Flat products list", False, f"Error: {str(e)}")
        return False

def test_grouped_category_spices():
    """Test 3: GET /api/products?category=Spices — grouped Spices with Turmeric Powder variants"""
    print("=" * 80)
    print("TEST 3: GET /api/products?category=Spices (grouped)")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/products?category=Spices", timeout=10)
        data = resp.json()
        
        products = data.get("products", [])
        total = data.get("total", 0)
        
        # Should be ~10 grouped spices
        is_grouped_spices = 8 <= total <= 15
        
        # Find Turmeric Powder
        turmeric = None
        for p in products:
            if "Turmeric Powder" in p.get("name", ""):
                turmeric = p
                break
        
        # Verify Turmeric has 2 variants (80 G and 200 G)
        turmeric_valid = False
        if turmeric:
            variant_count = turmeric.get("variant_count", 0)
            variants = turmeric.get("variants", [])
            weights = [v.get("weight") for v in variants]
            turmeric_valid = (
                variant_count == 2 and
                len(variants) == 2 and
                "80 G" in weights and
                "200 G" in weights
            )
        
        # Check for Mustard and Cumin
        has_mustard = any("Mustard" in p.get("name", "") for p in products)
        has_cumin = any("Cumin" in p.get("name", "") or "Jeera" in p.get("name", "") for p in products)
        
        passed = (
            resp.status_code == 200 and
            is_grouped_spices and
            turmeric is not None and
            turmeric_valid and
            has_mustard and
            has_cumin
        )
        
        print_test(
            "Grouped Spices category",
            passed,
            f"Status: {resp.status_code}, Total: {total} (expected 8-15), Turmeric found: {turmeric is not None}, Turmeric variants: {turmeric.get('variant_count') if turmeric else 0}, Weights: {[v.get('weight') for v in turmeric.get('variants', [])] if turmeric else []}, Has Mustard: {has_mustard}, Has Cumin: {has_cumin}"
        )
        return passed
    except Exception as e:
        print_test("Grouped Spices category", False, f"Error: {str(e)}")
        return False

def test_product_detail_with_variants():
    """Test 4: GET /api/product/:id — returns {product, variants, similar}"""
    print("=" * 80)
    print("TEST 4: GET /api/product/:id (with variants)")
    print("=" * 80)
    try:
        # First get flat products to find Red Rice Unpolished
        resp_flat = requests.get(f"{BASE_URL}/products?grouped=false", timeout=10)
        data_flat = resp_flat.json()
        products_flat = data_flat.get("products", [])
        
        # Find Red Rice Unpolished (has 2 variants: 1 Kg and 5 Kg)
        red_rice = None
        for p in products_flat:
            if p.get("name") == "Red Rice Unpolished":
                red_rice = p
                break
        
        if not red_rice:
            print_test("Product detail with variants", False, "Red Rice Unpolished not found")
            return False
        
        product_id = red_rice.get("id")
        
        # Get product detail
        resp = requests.get(f"{BASE_URL}/product/{product_id}", timeout=10)
        data = resp.json()
        
        product = data.get("product")
        variants = data.get("variants", [])
        similar = data.get("similar", [])
        
        # Verify variants are sorted by weight ascending (1 Kg before 5 Kg)
        variants_sorted = True
        if len(variants) >= 2:
            # First should be 1 Kg, second should be 5 Kg
            first_weight = variants[0].get("weight", "")
            second_weight = variants[1].get("weight", "")
            variants_sorted = "1 Kg" in first_weight or "1Kg" in first_weight.replace(" ", "")
        
        # Verify similar products are deduped by name
        similar_names = [s.get("name") for s in similar]
        similar_deduped = len(similar_names) == len(set(similar_names))
        
        passed = (
            resp.status_code == 200 and
            product is not None and
            product.get("name") == "Red Rice Unpolished" and
            len(variants) == 2 and
            variants_sorted and
            isinstance(similar, list) and
            similar_deduped
        )
        
        print_test(
            "Product detail with variants",
            passed,
            f"Status: {resp.status_code}, Product: {product.get('name') if product else 'None'}, Variants count: {len(variants)}, Variant weights: {[v.get('weight') for v in variants]}, Sorted: {variants_sorted}, Similar count: {len(similar)}, Similar deduped: {similar_deduped}"
        )
        return passed
    except Exception as e:
        print_test("Product detail with variants", False, f"Error: {str(e)}")
        return False

def test_order_endpoint_public():
    """Test 5: GET /api/order/:order_id — public order detail"""
    print("=" * 80)
    print("TEST 5: GET /api/order/:order_id (public endpoint)")
    print("=" * 80)
    try:
        # First place an order with multiple variants of same product
        order_data = {
            "name": "Arjun Patel",
            "phone": "9876543210",
            "email": "arjun.patel@example.com",
            "address": "456 Brigade Road",
            "city": "Bengaluru",
            "pincode": "560001",
            "items": [
                {
                    "id": "x1",
                    "name": "Turmeric Powder",
                    "weight": "200 G",
                    "price": 205,
                    "qty": 1,
                    "image": "/x.jpg",
                    "category": "Spices"
                },
                {
                    "id": "x2",
                    "name": "Turmeric Powder",
                    "weight": "80 G",
                    "price": 75,
                    "qty": 2,
                    "image": "/x.jpg",
                    "category": "Spices"
                }
            ],
            "subtotal": 355,
            "delivery": 60,
            "total": 415,
            "payment_method": "COD"
        }
        
        resp_create = requests.post(f"{BASE_URL}/orders", json=order_data, timeout=10)
        data_create = resp_create.json()
        order_id = data_create.get("order_id")
        
        if not order_id:
            print_test("Order endpoint (create)", False, "Failed to create order")
            return False
        
        # Now get the order via public endpoint
        resp = requests.get(f"{BASE_URL}/order/{order_id}", timeout=10)
        data = resp.json()
        
        order = data.get("order")
        
        # Verify order has items with weight preserved
        items_valid = False
        if order and "items" in order:
            items = order.get("items", [])
            if len(items) == 2:
                weights = [item.get("weight") for item in items]
                items_valid = "200 G" in weights and "80 G" in weights
        
        passed_valid = (
            resp.status_code == 200 and
            order is not None and
            order.get("order_id") == order_id and
            items_valid
        )
        
        print_test(
            "Order endpoint (valid ID)",
            passed_valid,
            f"Status: {resp.status_code}, Order ID: {order_id}, Items count: {len(order.get('items', [])) if order else 0}, Weights preserved: {items_valid}"
        )
        
        # Test invalid order ID
        resp_invalid = requests.get(f"{BASE_URL}/order/FAKE-INVALID-ID", timeout=10)
        data_invalid = resp_invalid.json()
        
        passed_invalid = (
            resp_invalid.status_code == 404 and
            "error" in data_invalid
        )
        
        print_test(
            "Order endpoint (invalid ID)",
            passed_invalid,
            f"Status: {resp_invalid.status_code}, Response: {json.dumps(data_invalid)}"
        )
        
        return passed_valid and passed_invalid
    except Exception as e:
        print_test("Order endpoint", False, f"Error: {str(e)}")
        return False

def test_razorpay_verify_error_paths():
    """Test 6: POST /api/razorpay/verify — error handling"""
    print("=" * 80)
    print("TEST 6: POST /api/razorpay/verify (error paths)")
    print("=" * 80)
    
    # Test empty body
    try:
        resp_empty = requests.post(f"{BASE_URL}/razorpay/verify", json={}, timeout=10)
        data_empty = resp_empty.json()
        
        passed_empty = (
            resp_empty.status_code == 400 and
            "error" in data_empty and
            "Missing fields" in data_empty.get("error", "")
        )
        
        print_test(
            "Razorpay verify (empty body)",
            passed_empty,
            f"Status: {resp_empty.status_code}, Response: {json.dumps(data_empty)}"
        )
    except Exception as e:
        print_test("Razorpay verify (empty body)", False, f"Error: {str(e)}")
        passed_empty = False
    
    # Test with fake signature (should fail verification, not crash)
    try:
        resp_fake = requests.post(
            f"{BASE_URL}/razorpay/verify",
            json={
                "razorpay_order_id": "order_fake123",
                "razorpay_payment_id": "pay_fake456",
                "razorpay_signature": "badsignature",
                "order_payload": {
                    "name": "Test",
                    "phone": "1234567890",
                    "email": "test@example.com",
                    "address": "Test",
                    "city": "Test",
                    "pincode": "123456",
                    "items": [],
                    "subtotal": 100,
                    "delivery": 0,
                    "total": 100
                }
            },
            timeout=10
        )
        data_fake = resp_fake.json()
        
        # Should return 400 with error, NOT 500
        passed_fake = (
            resp_fake.status_code == 400 and
            data_fake.get("ok") == False and
            "error" in data_fake and
            "Signature verification failed" in data_fake.get("error", "")
        )
        
        print_test(
            "Razorpay verify (bad signature)",
            passed_fake,
            f"Status: {resp_fake.status_code} (expected 400, not 500), Response: {json.dumps(data_fake)}"
        )
    except Exception as e:
        print_test("Razorpay verify (bad signature)", False, f"Error: {str(e)}")
        passed_fake = False
    
    return passed_empty and passed_fake

def test_expanded_csv_export():
    """Test 7: GET /api/admin/csv — expanded CSV with new columns"""
    print("=" * 80)
    print("TEST 7: GET /api/admin/csv (expanded format)")
    print("=" * 80)
    try:
        # Use session for cookie-based auth
        session = requests.Session()
        
        # Admin login
        resp_login = session.post(
            f"{BASE_URL}/admin/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if resp_login.status_code != 200:
            print_test("Admin CSV (login)", False, f"Login failed: {resp_login.status_code}")
            return False
        
        # Get CSV
        resp = session.get(f"{BASE_URL}/admin/csv", timeout=10)
        
        content_type = resp.headers.get("Content-Type", "")
        is_csv = "text/csv" in content_type
        
        # Check header line
        lines = resp.text.split('\n')
        header = lines[0] if lines else ""
        
        expected_header = "order_id,date,customer_name,email,phone,address,city,pincode,product_name,variant,quantity,unit_price,line_total,payment_method,payment_status,razorpay_payment_id,order_status,order_total"
        
        header_match = header.strip() == expected_header
        
        # Check if there's at least one data row
        has_data = len(lines) > 1 and len(lines[1].strip()) > 0
        
        passed = (
            resp.status_code == 200 and
            is_csv and
            header_match and
            has_data
        )
        
        print_test(
            "Admin CSV export",
            passed,
            f"Status: {resp.status_code}, Content-Type: {content_type}, Header match: {header_match}, Lines: {len(lines)}, Has data: {has_data}"
        )
        
        if not header_match:
            print(f"    Expected header: {expected_header}")
            print(f"    Actual header:   {header.strip()}")
        
        return passed
    except Exception as e:
        print_test("Admin CSV export", False, f"Error: {str(e)}")
        return False

def test_regression_health():
    """Test 8a: GET /api/health (regression)"""
    print("=" * 80)
    print("TEST 8a: GET /api/health (regression)")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/health", timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True
        )
        
        print_test("Health endpoint", passed, f"Status: {resp.status_code}")
        return passed
    except Exception as e:
        print_test("Health endpoint", False, f"Error: {str(e)}")
        return False

def test_regression_categories():
    """Test 8b: GET /api/categories (regression)"""
    print("=" * 80)
    print("TEST 8b: GET /api/categories (regression)")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/categories", timeout=10)
        data = resp.json()
        
        categories = data.get("categories", [])
        passed = (
            resp.status_code == 200 and
            len(categories) == 12
        )
        
        print_test("Categories endpoint", passed, f"Status: {resp.status_code}, Count: {len(categories)}")
        return passed
    except Exception as e:
        print_test("Categories endpoint", False, f"Error: {str(e)}")
        return False

def test_regression_auth():
    """Test 8c: Auth endpoints (regression)"""
    print("=" * 80)
    print("TEST 8c: Auth endpoints (regression)")
    print("=" * 80)
    
    session = requests.Session()
    
    # Signup
    try:
        unique_email = f"test.user.{int(time.time())}@example.com"
        resp_signup = session.post(
            f"{BASE_URL}/auth/signup",
            json={
                "name": "Priya Sharma",
                "email": unique_email,
                "password": "password123",
                "phone": "9876543210"
            },
            timeout=10
        )
        data_signup = resp_signup.json()
        
        passed_signup = (
            resp_signup.status_code == 200 and
            data_signup.get("ok") == True
        )
        
        print_test("Auth signup", passed_signup, f"Status: {resp_signup.status_code}")
    except Exception as e:
        print_test("Auth signup", False, f"Error: {str(e)}")
        passed_signup = False
    
    # Get current user
    try:
        resp_me = session.get(f"{BASE_URL}/auth/me", timeout=10)
        data_me = resp_me.json()
        
        passed_me = (
            resp_me.status_code == 200 and
            data_me.get("user") is not None
        )
        
        print_test("Auth me", passed_me, f"Status: {resp_me.status_code}")
    except Exception as e:
        print_test("Auth me", False, f"Error: {str(e)}")
        passed_me = False
    
    return passed_signup and passed_me

def test_regression_orders():
    """Test 8d: Orders endpoints (regression)"""
    print("=" * 80)
    print("TEST 8d: Orders endpoints (regression)")
    print("=" * 80)
    
    session = requests.Session()
    
    # Login first
    try:
        unique_email = f"test.order.{int(time.time())}@example.com"
        resp_signup = session.post(
            f"{BASE_URL}/auth/signup",
            json={
                "name": "Vikram Singh",
                "email": unique_email,
                "password": "password123",
                "phone": "9876543210"
            },
            timeout=10
        )
        
        if resp_signup.status_code != 200:
            print_test("Orders (user setup)", False, "Failed to create user")
            return False
    except Exception as e:
        print_test("Orders (user setup)", False, f"Error: {str(e)}")
        return False
    
    # Place order
    try:
        order_data = {
            "name": "Vikram Singh",
            "phone": "9876543210",
            "email": unique_email,
            "address": "789 MG Road",
            "city": "Bengaluru",
            "pincode": "560034",
            "items": [
                {
                    "id": "test-id",
                    "name": "Ragi Flour",
                    "weight": "1 Kg",
                    "price": 120,
                    "qty": 1,
                    "image": "/test.jpg",
                    "category": "Flours"
                }
            ],
            "subtotal": 120,
            "delivery": 60,
            "total": 180,
            "payment_method": "COD"
        }
        
        resp_create = session.post(f"{BASE_URL}/orders", json=order_data, timeout=10)
        data_create = resp_create.json()
        
        order_id = data_create.get("order_id")
        has_user_id = data_create.get("order", {}).get("user_id") is not None
        
        passed_create = (
            resp_create.status_code == 200 and
            data_create.get("ok") == True and
            order_id is not None and
            has_user_id
        )
        
        print_test("Create order (logged in)", passed_create, f"Status: {resp_create.status_code}, Has user_id: {has_user_id}")
    except Exception as e:
        print_test("Create order", False, f"Error: {str(e)}")
        passed_create = False
    
    # Get user orders
    try:
        resp_orders = session.get(f"{BASE_URL}/auth/orders", timeout=10)
        data_orders = resp_orders.json()
        
        orders = data_orders.get("orders", [])
        passed_orders = (
            resp_orders.status_code == 200 and
            len(orders) > 0
        )
        
        print_test("Get user orders", passed_orders, f"Status: {resp_orders.status_code}, Count: {len(orders)}")
    except Exception as e:
        print_test("Get user orders", False, f"Error: {str(e)}")
        passed_orders = False
    
    return passed_create and passed_orders

def test_regression_admin():
    """Test 8e: Admin endpoints (regression)"""
    print("=" * 80)
    print("TEST 8e: Admin endpoints (regression)")
    print("=" * 80)
    
    session = requests.Session()
    
    # Admin login
    try:
        resp_login = session.post(
            f"{BASE_URL}/admin/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        data_login = resp_login.json()
        
        passed_login = (
            resp_login.status_code == 200 and
            data_login.get("ok") == True
        )
        
        print_test("Admin login", passed_login, f"Status: {resp_login.status_code}")
    except Exception as e:
        print_test("Admin login", False, f"Error: {str(e)}")
        passed_login = False
        return False
    
    # Get all orders
    try:
        resp_orders = session.get(f"{BASE_URL}/admin/orders", timeout=10)
        data_orders = resp_orders.json()
        
        orders = data_orders.get("orders", [])
        passed_orders = (
            resp_orders.status_code == 200 and
            isinstance(orders, list)
        )
        
        print_test("Admin get orders", passed_orders, f"Status: {resp_orders.status_code}, Count: {len(orders)}")
    except Exception as e:
        print_test("Admin get orders", False, f"Error: {str(e)}")
        passed_orders = False
    
    # Get all users
    try:
        resp_users = session.get(f"{BASE_URL}/admin/users", timeout=10)
        data_users = resp_users.json()
        
        users = data_users.get("users", [])
        
        # Check no password_hash exposed
        no_password_hash = True
        if users:
            no_password_hash = all("password_hash" not in u for u in users)
        
        passed_users = (
            resp_users.status_code == 200 and
            isinstance(users, list) and
            no_password_hash
        )
        
        print_test("Admin get users", passed_users, f"Status: {resp_users.status_code}, Count: {len(users)}, No password_hash: {no_password_hash}")
    except Exception as e:
        print_test("Admin get users", False, f"Error: {str(e)}")
        passed_users = False
    
    # Update order status
    try:
        # Get first order
        resp_orders = session.get(f"{BASE_URL}/admin/orders", timeout=10)
        data_orders = resp_orders.json()
        orders = data_orders.get("orders", [])
        
        if orders:
            order_id = orders[0].get("order_id")
            
            resp_status = session.post(
                f"{BASE_URL}/admin/order/{order_id}/status",
                json={"status": "shipped"},
                timeout=10
            )
            data_status = resp_status.json()
            
            passed_status = (
                resp_status.status_code == 200 and
                data_status.get("ok") == True
            )
            
            print_test("Admin update status", passed_status, f"Status: {resp_status.status_code}")
        else:
            print_test("Admin update status", False, "No orders to update")
            passed_status = False
    except Exception as e:
        print_test("Admin update status", False, f"Error: {str(e)}")
        passed_status = False
    
    return passed_login and passed_orders and passed_users and passed_status

def main():
    print("\n" + "=" * 80)
    print("AVANI ORGANICS PRODUCTION-READINESS BACKEND TESTS")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print("=" * 80 + "\n")
    
    results = {}
    
    # Test 1-3: Grouped products
    results["grouped_products_default"] = test_grouped_products_default()
    results["flat_products"] = test_flat_products()
    results["grouped_category_spices"] = test_grouped_category_spices()
    
    # Test 4: Product detail with variants
    results["product_detail_variants"] = test_product_detail_with_variants()
    
    # Test 5: New order endpoint
    results["order_endpoint_public"] = test_order_endpoint_public()
    
    # Test 6: Razorpay error paths
    results["razorpay_verify_errors"] = test_razorpay_verify_error_paths()
    
    # Test 7: Expanded CSV
    results["expanded_csv"] = test_expanded_csv_export()
    
    # Test 8: Regression
    results["regression_health"] = test_regression_health()
    results["regression_categories"] = test_regression_categories()
    results["regression_auth"] = test_regression_auth()
    results["regression_orders"] = test_regression_orders()
    results["regression_admin"] = test_regression_admin()
    
    # Summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    failed = total - passed
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} | {test_name}")
    
    print("=" * 80)
    print(f"Total: {total} | Passed: {passed} | Failed: {failed}")
    print("=" * 80 + "\n")
    
    # Exit with appropriate code
    sys.exit(0 if failed == 0 else 1)

if __name__ == "__main__":
    main()
