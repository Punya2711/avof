#!/usr/bin/env python3
"""
Comprehensive auth system tests for Avani Organics
Tests cookie-based JWT authentication for users and admin
"""
import requests
import json
import sys
import time

BASE_URL = "https://fresh-organics-dev.preview.emergentagent.com/api"

def print_step(step_num, description, passed, details=""):
    """Print test step result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"\n{'='*80}")
    print(f"STEP {step_num}: {description}")
    print(f"{'='*80}")
    print(f"{status}")
    if details:
        print(f"Details: {details}")
    return passed

def main():
    print("\n" + "="*80)
    print("AVANI ORGANICS AUTH SYSTEM TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = []
    
    # Create two separate sessions for user and admin
    user_session = requests.Session()
    admin_session = requests.Session()
    
    # Generate unique email for test user
    unique_email = f"testuser_{int(time.time())}@example.com"
    test_password = "secret123"
    test_user_data = {
        "name": "Test User",
        "email": unique_email,
        "password": test_password,
        "phone": "9876543210"
    }
    
    order_id = None
    
    # ========== USER FLOW ==========
    print("\n" + "="*80)
    print("USER AUTHENTICATION FLOW")
    print("="*80)
    
    # STEP 1: POST /api/auth/signup
    try:
        resp = user_session.post(f"{BASE_URL}/auth/signup", json=test_user_data, timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True and
            data.get("user") is not None and
            data["user"].get("user_id") is not None and
            data["user"].get("name") == test_user_data["name"] and
            data["user"].get("email") == unique_email and
            data["user"].get("phone") == test_user_data["phone"] and
            "avani_token" in user_session.cookies
        )
        
        user_id = data.get("user", {}).get("user_id")
        
        results.append(print_step(
            1, 
            "POST /api/auth/signup",
            passed,
            f"Status: {resp.status_code}, User ID: {user_id}, Cookie set: {'avani_token' in user_session.cookies}, Response: {json.dumps(data)}"
        ))
    except Exception as e:
        results.append(print_step(1, "POST /api/auth/signup", False, f"Error: {str(e)}"))
    
    # STEP 2: GET /api/auth/me
    try:
        resp = user_session.get(f"{BASE_URL}/auth/me", timeout=10)
        data = resp.json()
        
        user = data.get("user")
        passed = (
            resp.status_code == 200 and
            user is not None and
            user.get("user_id") is not None and
            user.get("name") == test_user_data["name"] and
            user.get("email") == unique_email and
            user.get("created_at") is not None
        )
        
        results.append(print_step(
            2,
            "GET /api/auth/me (logged in)",
            passed,
            f"Status: {resp.status_code}, User: {json.dumps(user)}"
        ))
    except Exception as e:
        results.append(print_step(2, "GET /api/auth/me", False, f"Error: {str(e)}"))
    
    # STEP 3: POST /api/orders
    try:
        order_data = {
            "name": "Test User",
            "phone": "9876543210",
            "email": unique_email,
            "address": "123 Test Road",
            "city": "Bengaluru",
            "pincode": "560001",
            "items": [
                {
                    "id": "red-rice-1kg",
                    "name": "Red Rice",
                    "price": 125,
                    "weight": "1 Kg",
                    "image": "/products/red-rice.jpg",
                    "category": "Traditional Rice",
                    "qty": 2
                }
            ],
            "subtotal": 250,
            "delivery": 60,
            "total": 310,
            "payment_method": "COD"
        }
        
        resp = user_session.post(f"{BASE_URL}/orders", json=order_data, timeout=10)
        data = resp.json()
        
        order_id = data.get("order_id")
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True and
            order_id is not None and
            order_id.startswith("AVN-")
        )
        
        results.append(print_step(
            3,
            "POST /api/orders (while logged in)",
            passed,
            f"Status: {resp.status_code}, Order ID: {order_id}"
        ))
    except Exception as e:
        results.append(print_step(3, "POST /api/orders", False, f"Error: {str(e)}"))
    
    # STEP 4: GET /api/auth/orders
    try:
        resp = user_session.get(f"{BASE_URL}/auth/orders", timeout=10)
        data = resp.json()
        
        orders = data.get("orders", [])
        order_found = any(o.get("order_id") == order_id for o in orders)
        has_user_id = all(o.get("user_id") is not None for o in orders)
        
        passed = (
            resp.status_code == 200 and
            len(orders) > 0 and
            order_found and
            has_user_id
        )
        
        results.append(print_step(
            4,
            "GET /api/auth/orders",
            passed,
            f"Status: {resp.status_code}, Orders count: {len(orders)}, Order found: {order_found}, All have user_id: {has_user_id}"
        ))
    except Exception as e:
        results.append(print_step(4, "GET /api/auth/orders", False, f"Error: {str(e)}"))
    
    # STEP 5: POST /api/auth/logout
    try:
        resp = user_session.post(f"{BASE_URL}/auth/logout", timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True
        )
        
        results.append(print_step(
            5,
            "POST /api/auth/logout",
            passed,
            f"Status: {resp.status_code}, Response: {json.dumps(data)}"
        ))
    except Exception as e:
        results.append(print_step(5, "POST /api/auth/logout", False, f"Error: {str(e)}"))
    
    # STEP 6: GET /api/auth/me (after logout)
    try:
        resp = user_session.get(f"{BASE_URL}/auth/me", timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("user") is None
        )
        
        results.append(print_step(
            6,
            "GET /api/auth/me (after logout)",
            passed,
            f"Status: {resp.status_code}, User: {data.get('user')}"
        ))
    except Exception as e:
        results.append(print_step(6, "GET /api/auth/me (after logout)", False, f"Error: {str(e)}"))
    
    # STEP 7: POST /api/auth/login
    try:
        login_data = {
            "email": unique_email,
            "password": test_password
        }
        
        resp = user_session.post(f"{BASE_URL}/auth/login", json=login_data, timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True and
            data.get("user") is not None and
            "avani_token" in user_session.cookies
        )
        
        results.append(print_step(
            7,
            "POST /api/auth/login",
            passed,
            f"Status: {resp.status_code}, Cookie set: {'avani_token' in user_session.cookies}, Response: {json.dumps(data)}"
        ))
    except Exception as e:
        results.append(print_step(7, "POST /api/auth/login", False, f"Error: {str(e)}"))
    
    # ========== NEGATIVE USER CASES ==========
    print("\n" + "="*80)
    print("NEGATIVE USER TEST CASES")
    print("="*80)
    
    # STEP 8: Duplicate email signup
    try:
        resp = user_session.post(f"{BASE_URL}/auth/signup", json=test_user_data, timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 400 and
            "error" in data and
            "already registered" in data["error"].lower()
        )
        
        results.append(print_step(
            8,
            "POST /api/auth/signup (duplicate email)",
            passed,
            f"Status: {resp.status_code}, Error: {data.get('error')}"
        ))
    except Exception as e:
        results.append(print_step(8, "Duplicate email signup", False, f"Error: {str(e)}"))
    
    # STEP 9: Short password signup
    try:
        short_pwd_data = {
            "name": "Test User 2",
            "email": f"testuser2_{int(time.time())}@example.com",
            "password": "short",
            "phone": "9876543210"
        }
        
        resp = user_session.post(f"{BASE_URL}/auth/signup", json=short_pwd_data, timeout=10)
        data = resp.json()
        
        passed = resp.status_code == 400
        
        results.append(print_step(
            9,
            "POST /api/auth/signup (password < 6 chars)",
            passed,
            f"Status: {resp.status_code}, Error: {data.get('error')}"
        ))
    except Exception as e:
        results.append(print_step(9, "Short password signup", False, f"Error: {str(e)}"))
    
    # STEP 10: Wrong password login
    try:
        wrong_login = {
            "email": unique_email,
            "password": "wrongpassword123"
        }
        
        resp = user_session.post(f"{BASE_URL}/auth/login", json=wrong_login, timeout=10)
        data = resp.json()
        
        passed = resp.status_code == 401
        
        results.append(print_step(
            10,
            "POST /api/auth/login (wrong password)",
            passed,
            f"Status: {resp.status_code}, Error: {data.get('error')}"
        ))
    except Exception as e:
        results.append(print_step(10, "Wrong password login", False, f"Error: {str(e)}"))
    
    # STEP 11: GET /api/auth/orders without cookie
    try:
        fresh_session = requests.Session()
        resp = fresh_session.get(f"{BASE_URL}/auth/orders", timeout=10)
        data = resp.json()
        
        passed = resp.status_code == 401
        
        results.append(print_step(
            11,
            "GET /api/auth/orders (no cookie)",
            passed,
            f"Status: {resp.status_code}, Error: {data.get('error')}"
        ))
    except Exception as e:
        results.append(print_step(11, "Auth orders without cookie", False, f"Error: {str(e)}"))
    
    # ========== ADMIN FLOW ==========
    print("\n" + "="*80)
    print("ADMIN AUTHENTICATION FLOW")
    print("="*80)
    
    # STEP 12: POST /api/admin/login
    try:
        admin_login = {
            "email": "admin@avaniorganic.com",
            "password": "Avani@2025"
        }
        
        resp = admin_session.post(f"{BASE_URL}/admin/login", json=admin_login, timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True and
            data.get("admin") is not None and
            data["admin"].get("email") == "admin@avaniorganic.com" and
            "avani_admin_token" in admin_session.cookies
        )
        
        results.append(print_step(
            12,
            "POST /api/admin/login",
            passed,
            f"Status: {resp.status_code}, Cookie set: {'avani_admin_token' in admin_session.cookies}, Response: {json.dumps(data)}"
        ))
    except Exception as e:
        results.append(print_step(12, "POST /api/admin/login", False, f"Error: {str(e)}"))
    
    # STEP 13: GET /api/admin/me
    try:
        resp = admin_session.get(f"{BASE_URL}/admin/me", timeout=10)
        data = resp.json()
        
        admin = data.get("admin")
        passed = (
            resp.status_code == 200 and
            admin is not None and
            admin.get("email") == "admin@avaniorganic.com"
        )
        
        results.append(print_step(
            13,
            "GET /api/admin/me",
            passed,
            f"Status: {resp.status_code}, Admin: {json.dumps(admin)}"
        ))
    except Exception as e:
        results.append(print_step(13, "GET /api/admin/me", False, f"Error: {str(e)}"))
    
    # STEP 14: GET /api/admin/orders
    try:
        resp = admin_session.get(f"{BASE_URL}/admin/orders", timeout=10)
        data = resp.json()
        
        orders = data.get("orders", [])
        order_found = any(o.get("order_id") == order_id for o in orders) if order_id else True
        
        passed = (
            resp.status_code == 200 and
            isinstance(orders, list) and
            order_found
        )
        
        results.append(print_step(
            14,
            "GET /api/admin/orders",
            passed,
            f"Status: {resp.status_code}, Orders count: {len(orders)}, Test order found: {order_found}"
        ))
    except Exception as e:
        results.append(print_step(14, "GET /api/admin/orders", False, f"Error: {str(e)}"))
    
    # STEP 15: GET /api/admin/users
    try:
        resp = admin_session.get(f"{BASE_URL}/admin/users", timeout=10)
        data = resp.json()
        
        users = data.get("users", [])
        test_user_found = any(u.get("email") == unique_email for u in users)
        no_password_hash = all("password_hash" not in u for u in users)
        
        passed = (
            resp.status_code == 200 and
            isinstance(users, list) and
            test_user_found and
            no_password_hash
        )
        
        results.append(print_step(
            15,
            "GET /api/admin/users",
            passed,
            f"Status: {resp.status_code}, Users count: {len(users)}, Test user found: {test_user_found}, No password_hash: {no_password_hash}"
        ))
    except Exception as e:
        results.append(print_step(15, "GET /api/admin/users", False, f"Error: {str(e)}"))
    
    # STEP 16: POST /api/admin/order/:order_id/status
    if order_id:
        try:
            status_data = {"status": "shipped"}
            resp = admin_session.post(f"{BASE_URL}/admin/order/{order_id}/status", json=status_data, timeout=10)
            data = resp.json()
            
            passed = (
                resp.status_code == 200 and
                data.get("ok") == True
            )
            
            # Verify status was updated
            if passed:
                resp_verify = admin_session.get(f"{BASE_URL}/admin/orders", timeout=10)
                data_verify = resp_verify.json()
                orders = data_verify.get("orders", [])
                updated_order = next((o for o in orders if o.get("order_id") == order_id), None)
                
                if updated_order:
                    status_updated = updated_order.get("status") == "shipped"
                    passed = passed and status_updated
                    details = f"Status: {resp.status_code}, Status updated: {status_updated}, Current status: {updated_order.get('status')}"
                else:
                    passed = False
                    details = f"Status: {resp.status_code}, Order not found after update"
            else:
                details = f"Status: {resp.status_code}, Response: {json.dumps(data)}"
            
            results.append(print_step(16, "POST /api/admin/order/:id/status", passed, details))
        except Exception as e:
            results.append(print_step(16, "Update order status", False, f"Error: {str(e)}"))
    else:
        results.append(print_step(16, "POST /api/admin/order/:id/status", False, "No order_id available"))
    
    # STEP 17: GET /api/admin/csv
    try:
        resp = admin_session.get(f"{BASE_URL}/admin/csv", timeout=10)
        
        content_type = resp.headers.get("Content-Type", "")
        is_csv = "text/csv" in content_type
        has_header = "order_id,date,customer,phone,email,address,products,total,status" in resp.text
        has_data = len(resp.text.split('\n')) > 1
        
        passed = (
            resp.status_code == 200 and
            is_csv and
            has_header and
            has_data
        )
        
        results.append(print_step(
            17,
            "GET /api/admin/csv",
            passed,
            f"Status: {resp.status_code}, Content-Type: {content_type}, Has header: {has_header}, Lines: {len(resp.text.split(chr(10)))}"
        ))
    except Exception as e:
        results.append(print_step(17, "GET /api/admin/csv", False, f"Error: {str(e)}"))
    
    # STEP 18: POST /api/admin/logout
    try:
        resp = admin_session.post(f"{BASE_URL}/admin/logout", timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True
        )
        
        # Verify logout
        if passed:
            resp_verify = admin_session.get(f"{BASE_URL}/admin/me", timeout=10)
            data_verify = resp_verify.json()
            logged_out = data_verify.get("admin") is None
            passed = passed and logged_out
            details = f"Status: {resp.status_code}, Logged out: {logged_out}"
        else:
            details = f"Status: {resp.status_code}, Response: {json.dumps(data)}"
        
        results.append(print_step(18, "POST /api/admin/logout", passed, details))
    except Exception as e:
        results.append(print_step(18, "POST /api/admin/logout", False, f"Error: {str(e)}"))
    
    # ========== NEGATIVE ADMIN CASES ==========
    print("\n" + "="*80)
    print("NEGATIVE ADMIN TEST CASES")
    print("="*80)
    
    # STEP 19: Wrong password admin login
    try:
        wrong_admin_login = {
            "email": "admin@avaniorganic.com",
            "password": "wrongpassword"
        }
        
        fresh_admin_session = requests.Session()
        resp = fresh_admin_session.post(f"{BASE_URL}/admin/login", json=wrong_admin_login, timeout=10)
        data = resp.json()
        
        passed = resp.status_code == 401
        
        results.append(print_step(
            19,
            "POST /api/admin/login (wrong password)",
            passed,
            f"Status: {resp.status_code}, Error: {data.get('error')}"
        ))
    except Exception as e:
        results.append(print_step(19, "Wrong admin password", False, f"Error: {str(e)}"))
    
    # STEP 20: GET /api/admin/orders without cookie
    try:
        fresh_session = requests.Session()
        resp = fresh_session.get(f"{BASE_URL}/admin/orders", timeout=10)
        data = resp.json()
        
        passed = resp.status_code == 401
        
        results.append(print_step(
            20,
            "GET /api/admin/orders (no cookie)",
            passed,
            f"Status: {resp.status_code}, Error: {data.get('error')}"
        ))
    except Exception as e:
        results.append(print_step(20, "Admin orders without cookie", False, f"Error: {str(e)}"))
    
    # STEP 21: GET /api/admin/users without cookie
    try:
        fresh_session = requests.Session()
        resp = fresh_session.get(f"{BASE_URL}/admin/users", timeout=10)
        data = resp.json()
        
        passed = resp.status_code == 401
        
        results.append(print_step(
            21,
            "GET /api/admin/users (no cookie)",
            passed,
            f"Status: {resp.status_code}, Error: {data.get('error')}"
        ))
    except Exception as e:
        results.append(print_step(21, "Admin users without cookie", False, f"Error: {str(e)}"))
    
    # ========== REGRESSION TESTS ==========
    print("\n" + "="*80)
    print("REGRESSION TESTS (NO AUTH)")
    print("="*80)
    
    # STEP 22: GET /api/health
    try:
        resp = requests.get(f"{BASE_URL}/health", timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True
        )
        
        results.append(print_step(
            22,
            "GET /api/health",
            passed,
            f"Status: {resp.status_code}, Response: {json.dumps(data)}"
        ))
    except Exception as e:
        results.append(print_step(22, "GET /api/health", False, f"Error: {str(e)}"))
    
    # STEP 23: GET /api/products?category=Millets
    try:
        resp = requests.get(f"{BASE_URL}/products?category=Millets", timeout=10)
        data = resp.json()
        
        products = data.get("products", [])
        all_millets = all(p.get("category") == "Millets" for p in products)
        
        passed = (
            resp.status_code == 200 and
            len(products) > 0 and
            all_millets
        )
        
        results.append(print_step(
            23,
            "GET /api/products?category=Millets",
            passed,
            f"Status: {resp.status_code}, Count: {len(products)}, All Millets: {all_millets}"
        ))
    except Exception as e:
        results.append(print_step(23, "Products category filter", False, f"Error: {str(e)}"))
    
    # STEP 24: GET /api/categories
    try:
        resp = requests.get(f"{BASE_URL}/categories", timeout=10)
        data = resp.json()
        
        categories = data.get("categories", [])
        
        passed = (
            resp.status_code == 200 and
            len(categories) == 12
        )
        
        results.append(print_step(
            24,
            "GET /api/categories",
            passed,
            f"Status: {resp.status_code}, Count: {len(categories)}"
        ))
    except Exception as e:
        results.append(print_step(24, "GET /api/categories", False, f"Error: {str(e)}"))
    
    # STEP 25: POST /api/newsletter
    try:
        newsletter_data = {"email": "news@example.com"}
        resp = requests.post(f"{BASE_URL}/newsletter", json=newsletter_data, timeout=10)
        data = resp.json()
        
        passed = (
            resp.status_code == 200 and
            data.get("ok") == True
        )
        
        results.append(print_step(
            25,
            "POST /api/newsletter",
            passed,
            f"Status: {resp.status_code}, Response: {json.dumps(data)}"
        ))
    except Exception as e:
        results.append(print_step(25, "POST /api/newsletter", False, f"Error: {str(e)}"))
    
    # ========== SUMMARY ==========
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    total = len(results)
    passed = sum(1 for r in results if r)
    failed = total - passed
    
    print(f"\nTotal Tests: {total}")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {failed} ❌")
    print(f"Success Rate: {(passed/total*100):.1f}%")
    
    print("\n" + "="*80)
    
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
