#!/usr/bin/env python3
"""
Comprehensive backend API tests for Avani Organics e-commerce platform
Tests all endpoints with positive and negative cases
"""
import requests
import json
import sys

BASE_URL = "https://fresh-organics-dev.preview.emergentagent.com/api"
ADMIN_PASSWORD = "avani2025"

def print_test(name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} | {name}")
    if details:
        print(f"    {details}")
    print()

def test_health():
    """Test 1: GET /api/health"""
    print("=" * 80)
    print("TEST 1: GET /api/health")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/health", timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True and
            data.get("service") == "avani-organics"
        )
        
        print_test(
            "Health endpoint",
            passed,
            f"Status: {resp.status_code}, Response: {json.dumps(data)}"
        )
        return passed
    except Exception as e:
        print_test("Health endpoint", False, f"Error: {str(e)}")
        return False

def test_categories():
    """Test 2: GET /api/categories"""
    print("=" * 80)
    print("TEST 2: GET /api/categories")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/categories", timeout=10)
        data = resp.json()
        
        expected_categories = [
            "Traditional Rice", "Millets", "Pulses", "Flours", 
            "Oils & Oil Seeds", "Sweeteners", "Salts", "Dry Fruits", 
            "Spices", "Super Foods", "Breakfast", "Dairy"
        ]
        
        categories = data.get("categories", [])
        passed = (
            resp.status_code == 200 and
            len(categories) == 12 and
            all(cat in categories for cat in expected_categories)
        )
        
        print_test(
            "Categories endpoint",
            passed,
            f"Status: {resp.status_code}, Count: {len(categories)}, Categories: {categories}"
        )
        return passed
    except Exception as e:
        print_test("Categories endpoint", False, f"Error: {str(e)}")
        return False

def test_products_list():
    """Test 3: GET /api/products"""
    print("=" * 80)
    print("TEST 3: GET /api/products")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/products", timeout=10)
        data = resp.json()
        
        products = data.get("products", [])
        total = data.get("total", 0)
        
        passed = (
            resp.status_code == 200 and
            total > 150 and
            len(products) == total and
            len(products) > 150
        )
        
        print_test(
            "Products list",
            passed,
            f"Status: {resp.status_code}, Total: {total}, Products count: {len(products)}"
        )
        
        # Return first product for later tests
        return passed, products[0] if products else None
    except Exception as e:
        print_test("Products list", False, f"Error: {str(e)}")
        return False, None

def test_products_category_filter():
    """Test 4: GET /api/products?category=Traditional+Rice"""
    print("=" * 80)
    print("TEST 4: GET /api/products?category=Traditional+Rice")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/products?category=Traditional+Rice", timeout=10)
        data = resp.json()
        
        products = data.get("products", [])
        all_traditional_rice = all(p.get("category") == "Traditional Rice" for p in products)
        
        passed = (
            resp.status_code == 200 and
            len(products) > 0 and
            all_traditional_rice
        )
        
        print_test(
            "Category filter (Traditional Rice)",
            passed,
            f"Status: {resp.status_code}, Count: {len(products)}, All Traditional Rice: {all_traditional_rice}"
        )
        return passed
    except Exception as e:
        print_test("Category filter", False, f"Error: {str(e)}")
        return False

def test_products_search():
    """Test 5: GET /api/products?q=ragi"""
    print("=" * 80)
    print("TEST 5: GET /api/products?q=ragi")
    print("=" * 80)
    try:
        resp = requests.get(f"{BASE_URL}/products?q=ragi", timeout=10)
        data = resp.json()
        
        products = data.get("products", [])
        all_contain_ragi = all(
            "ragi" in p.get("name", "").lower() or "ragi" in p.get("category", "").lower()
            for p in products
        )
        
        passed = (
            resp.status_code == 200 and
            len(products) > 0 and
            all_contain_ragi
        )
        
        sample_names = [p.get("name") for p in products[:3]]
        print_test(
            "Search query (ragi)",
            passed,
            f"Status: {resp.status_code}, Count: {len(products)}, Sample: {sample_names}"
        )
        return passed
    except Exception as e:
        print_test("Search query", False, f"Error: {str(e)}")
        return False

def test_products_sort():
    """Test 6: GET /api/products?sort=price-asc and sort=price-desc"""
    print("=" * 80)
    print("TEST 6: GET /api/products?sort=price-asc and sort=price-desc")
    print("=" * 80)
    
    # Test price-asc
    try:
        resp_asc = requests.get(f"{BASE_URL}/products?sort=price-asc", timeout=10)
        data_asc = resp_asc.json()
        products_asc = data_asc.get("products", [])
        
        first_price_asc = products_asc[0].get("price") if products_asc else 0
        is_sorted_asc = all(
            products_asc[i].get("price", 0) <= products_asc[i+1].get("price", 0)
            for i in range(min(10, len(products_asc)-1))
        )
        
        passed_asc = resp_asc.status_code == 200 and is_sorted_asc
        
        print_test(
            "Sort by price ascending",
            passed_asc,
            f"Status: {resp_asc.status_code}, First price: ₹{first_price_asc}, Sorted: {is_sorted_asc}"
        )
    except Exception as e:
        print_test("Sort by price ascending", False, f"Error: {str(e)}")
        passed_asc = False
    
    # Test price-desc
    try:
        resp_desc = requests.get(f"{BASE_URL}/products?sort=price-desc", timeout=10)
        data_desc = resp_desc.json()
        products_desc = data_desc.get("products", [])
        
        first_price_desc = products_desc[0].get("price") if products_desc else 0
        is_sorted_desc = all(
            products_desc[i].get("price", 0) >= products_desc[i+1].get("price", 0)
            for i in range(min(10, len(products_desc)-1))
        )
        
        passed_desc = resp_desc.status_code == 200 and is_sorted_desc
        
        print_test(
            "Sort by price descending",
            passed_desc,
            f"Status: {resp_desc.status_code}, First price: ₹{first_price_desc}, Sorted: {is_sorted_desc}"
        )
    except Exception as e:
        print_test("Sort by price descending", False, f"Error: {str(e)}")
        passed_desc = False
    
    return passed_asc and passed_desc

def test_product_detail(product_id):
    """Test 7: GET /api/product/:id (valid and invalid)"""
    print("=" * 80)
    print("TEST 7: GET /api/product/:id")
    print("=" * 80)
    
    # Test valid product ID
    try:
        resp = requests.get(f"{BASE_URL}/product/{product_id}", timeout=10)
        data = resp.json()
        
        product = data.get("product")
        similar = data.get("similar", [])
        
        passed_valid = (
            resp.status_code == 200 and
            product is not None and
            product.get("id") == product_id and
            isinstance(similar, list) and
            len(similar) <= 8
        )
        
        print_test(
            "Product detail (valid ID)",
            passed_valid,
            f"Status: {resp.status_code}, Product: {product.get('name') if product else 'None'}, Similar count: {len(similar)}"
        )
    except Exception as e:
        print_test("Product detail (valid ID)", False, f"Error: {str(e)}")
        passed_valid = False
    
    # Test invalid product ID
    try:
        resp_invalid = requests.get(f"{BASE_URL}/product/fake-invalid-id-12345", timeout=10)
        data_invalid = resp_invalid.json()
        
        passed_invalid = (
            resp_invalid.status_code == 404 and
            "error" in data_invalid
        )
        
        print_test(
            "Product detail (invalid ID)",
            passed_invalid,
            f"Status: {resp_invalid.status_code}, Response: {json.dumps(data_invalid)}"
        )
    except Exception as e:
        print_test("Product detail (invalid ID)", False, f"Error: {str(e)}")
        passed_invalid = False
    
    return passed_valid and passed_invalid

def test_create_order():
    """Test 8: POST /api/orders"""
    print("=" * 80)
    print("TEST 8: POST /api/orders")
    print("=" * 80)
    try:
        order_data = {
            "name": "Rajesh Kumar",
            "phone": "9876543210",
            "email": "rajesh.kumar@example.com",
            "address": "123 MG Road, Koramangala",
            "city": "Bengaluru",
            "pincode": "560034",
            "items": [
                {
                    "id": "test-product-id",
                    "name": "Red Rice Unpolished",
                    "price": 125,
                    "weight": "1 Kg",
                    "image": "https://example.com/image.jpg",
                    "category": "Traditional Rice",
                    "qty": 2
                }
            ],
            "subtotal": 250,
            "delivery": 60,
            "total": 310,
            "payment_method": "COD"
        }
        
        resp = requests.post(f"{BASE_URL}/orders", json=order_data, timeout=10)
        data = resp.json()
        
        order_id = data.get("order_id", "")
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True and
            order_id.startswith("AVN-") and
            "order" in data
        )
        
        print_test(
            "Create order",
            passed,
            f"Status: {resp.status_code}, Order ID: {order_id}, Response: {json.dumps(data, indent=2)[:200]}"
        )
        
        return passed, order_id if passed else None
    except Exception as e:
        print_test("Create order", False, f"Error: {str(e)}")
        return False, None

def test_newsletter():
    """Test 9: POST /api/newsletter"""
    print("=" * 80)
    print("TEST 9: POST /api/newsletter")
    print("=" * 80)
    try:
        newsletter_data = {
            "email": "priya.sharma@example.com"
        }
        
        resp = requests.post(f"{BASE_URL}/newsletter", json=newsletter_data, timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True
        )
        
        print_test(
            "Newsletter subscription",
            passed,
            f"Status: {resp.status_code}, Response: {json.dumps(data)}"
        )
        return passed
    except Exception as e:
        print_test("Newsletter subscription", False, f"Error: {str(e)}")
        return False

def test_admin_login():
    """Test 10a: POST /api/admin/login"""
    print("=" * 80)
    print("TEST 10a: POST /api/admin/login")
    print("=" * 80)
    
    # Test correct password
    try:
        resp_correct = requests.post(
            f"{BASE_URL}/admin/login",
            json={"password": ADMIN_PASSWORD},
            timeout=10
        )
        data_correct = resp_correct.json()
        
        passed_correct = (
            resp_correct.status_code == 200 and
            data_correct.get("ok") == True
        )
        
        print_test(
            "Admin login (correct password)",
            passed_correct,
            f"Status: {resp_correct.status_code}, Response: {json.dumps(data_correct)}"
        )
    except Exception as e:
        print_test("Admin login (correct password)", False, f"Error: {str(e)}")
        passed_correct = False
    
    # Test wrong password
    try:
        resp_wrong = requests.post(
            f"{BASE_URL}/admin/login",
            json={"password": "wrongpassword123"},
            timeout=10
        )
        data_wrong = resp_wrong.json()
        
        passed_wrong = (
            resp_wrong.status_code == 200 and
            data_wrong.get("ok") == False
        )
        
        print_test(
            "Admin login (wrong password)",
            passed_wrong,
            f"Status: {resp_wrong.status_code}, Response: {json.dumps(data_wrong)}"
        )
    except Exception as e:
        print_test("Admin login (wrong password)", False, f"Error: {str(e)}")
        passed_wrong = False
    
    return passed_correct and passed_wrong

def test_admin_orders(order_id):
    """Test 10b: GET /api/admin/orders"""
    print("=" * 80)
    print("TEST 10b: GET /api/admin/orders")
    print("=" * 80)
    
    # Test with correct password
    try:
        resp = requests.get(
            f"{BASE_URL}/admin/orders?password={ADMIN_PASSWORD}",
            timeout=10
        )
        data = resp.json()
        
        orders = data.get("orders", [])
        order_found = any(o.get("order_id") == order_id for o in orders) if order_id else True
        
        passed = (
            resp.status_code == 200 and
            isinstance(orders, list) and
            len(orders) > 0 and
            order_found
        )
        
        print_test(
            "Admin orders list (correct password)",
            passed,
            f"Status: {resp.status_code}, Orders count: {len(orders)}, Test order found: {order_found}"
        )
    except Exception as e:
        print_test("Admin orders list (correct password)", False, f"Error: {str(e)}")
        passed = False
    
    # Test with wrong password
    try:
        resp_wrong = requests.get(
            f"{BASE_URL}/admin/orders?password=wrongpassword",
            timeout=10
        )
        
        passed_wrong = resp_wrong.status_code == 401
        
        print_test(
            "Admin orders list (wrong password)",
            passed_wrong,
            f"Status: {resp_wrong.status_code}, Expected: 401"
        )
    except Exception as e:
        print_test("Admin orders list (wrong password)", False, f"Error: {str(e)}")
        passed_wrong = False
    
    return passed and passed_wrong

def test_admin_csv():
    """Test 10c: GET /api/admin/csv"""
    print("=" * 80)
    print("TEST 10c: GET /api/admin/csv")
    print("=" * 80)
    
    # Test with correct password
    try:
        resp = requests.get(
            f"{BASE_URL}/admin/csv?password={ADMIN_PASSWORD}",
            timeout=10
        )
        
        content_type = resp.headers.get("Content-Type", "")
        is_csv = "text/csv" in content_type or "csv" in content_type.lower()
        has_data = len(resp.text) > 0
        has_header = "order_id" in resp.text
        
        passed = (
            resp.status_code == 200 and
            is_csv and
            has_data and
            has_header
        )
        
        lines = resp.text.split('\n')
        print_test(
            "Admin CSV export (correct password)",
            passed,
            f"Status: {resp.status_code}, Content-Type: {content_type}, Lines: {len(lines)}, Has header: {has_header}"
        )
    except Exception as e:
        print_test("Admin CSV export (correct password)", False, f"Error: {str(e)}")
        passed = False
    
    # Test with wrong password
    try:
        resp_wrong = requests.get(
            f"{BASE_URL}/admin/csv?password=wrongpassword",
            timeout=10
        )
        
        passed_wrong = resp_wrong.status_code == 401
        
        print_test(
            "Admin CSV export (wrong password)",
            passed_wrong,
            f"Status: {resp_wrong.status_code}, Expected: 401"
        )
    except Exception as e:
        print_test("Admin CSV export (wrong password)", False, f"Error: {str(e)}")
        passed_wrong = False
    
    return passed and passed_wrong

def test_admin_update_status(order_id):
    """Test 10d: POST /api/admin/order/:order_id/status"""
    print("=" * 80)
    print("TEST 10d: POST /api/admin/order/:order_id/status")
    print("=" * 80)
    
    if not order_id:
        print_test("Admin update order status", False, "No order_id available from previous test")
        return False
    
    # Test updating status
    try:
        resp = requests.post(
            f"{BASE_URL}/admin/order/{order_id}/status",
            json={"password": ADMIN_PASSWORD, "status": "shipped"},
            timeout=10
        )
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True
        )
        
        print_test(
            "Admin update order status",
            passed,
            f"Status: {resp.status_code}, Response: {json.dumps(data)}"
        )
        
        # Verify the status was updated
        if passed:
            resp_verify = requests.get(
                f"{BASE_URL}/admin/orders?password={ADMIN_PASSWORD}",
                timeout=10
            )
            data_verify = resp_verify.json()
            orders = data_verify.get("orders", [])
            updated_order = next((o for o in orders if o.get("order_id") == order_id), None)
            
            if updated_order:
                status_updated = updated_order.get("status") == "shipped"
                print_test(
                    "Verify status update",
                    status_updated,
                    f"Order status: {updated_order.get('status')}, Expected: shipped"
                )
                return status_updated
        
        return passed
    except Exception as e:
        print_test("Admin update order status", False, f"Error: {str(e)}")
        return False

def main():
    print("\n" + "=" * 80)
    print("AVANI ORGANICS BACKEND API TEST SUITE")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print("=" * 80 + "\n")
    
    results = {}
    
    # Test 1: Health
    results["health"] = test_health()
    
    # Test 2: Categories
    results["categories"] = test_categories()
    
    # Test 3: Products list
    products_passed, sample_product = test_products_list()
    results["products_list"] = products_passed
    
    # Test 4: Category filter
    results["category_filter"] = test_products_category_filter()
    
    # Test 5: Search
    results["search"] = test_products_search()
    
    # Test 6: Sort
    results["sort"] = test_products_sort()
    
    # Test 7: Product detail
    if sample_product:
        results["product_detail"] = test_product_detail(sample_product.get("id"))
    else:
        print_test("Product detail", False, "No sample product available")
        results["product_detail"] = False
    
    # Test 8: Create order
    order_passed, order_id = test_create_order()
    results["create_order"] = order_passed
    
    # Test 9: Newsletter
    results["newsletter"] = test_newsletter()
    
    # Test 10: Admin endpoints
    results["admin_login"] = test_admin_login()
    results["admin_orders"] = test_admin_orders(order_id)
    results["admin_csv"] = test_admin_csv()
    results["admin_update_status"] = test_admin_update_status(order_id)
    
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
