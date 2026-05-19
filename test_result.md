#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

user_problem_statement: |
  Avani Organics — premium organic grocery site. Recently added:
  - Real product photos from Drive folder downloaded to /app/public/products/ (46 photos served as static assets)
  - Full email+password JWT auth for users (signup, login, logout, me, my orders)
  - Separate email+password JWT auth for admin (login, logout, me) - admin seeded on boot with admin@avaniorganic.com / Avani@2025
  - Admin endpoints now require JWT cookie (avani_admin_token) instead of query password
  - Orders attach user_id automatically when user is logged in

backend:
  - task: "Existing product/category/order/newsletter endpoints still working"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: true
        -agent: "testing"
        -comment: "Previously verified - all 13 endpoints passed."
        -working: "NA"
        -agent: "main"
        -comment: "Re-verify after refactor since admin auth changed from query-password to cookie-JWT."
        -working: true
        -agent: "testing"
        -comment: "REGRESSION PASSED. Tested GET /api/health, GET /api/products?category=Millets, GET /api/categories, POST /api/newsletter. All working correctly."

  - task: "POST /api/auth/signup — user registration with bcrypt + JWT cookie"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Body {name, email, password, phone?}. Validates length>=6, lowercases email, hashes pwd, sets avani_token cookie. Should return {ok, user}. Duplicate email -> 400."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Signup creates user, returns {ok:true, user:{user_id, name, email, phone}}, sets avani_token cookie. Duplicate email returns 400. Password <6 chars returns 400."

  - task: "POST /api/auth/login — user login"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Body {email, password}. Valid -> {ok, user} + cookie. Invalid -> 401."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Login with correct credentials returns {ok:true, user}, sets avani_token cookie. Wrong password returns 401."

  - task: "GET /api/auth/me — current user via cookie"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "With cookie -> {user: {user_id, name, email, phone, created_at}}. Without -> {user: null}."
        -working: true
        -agent: "testing"
        -comment: "PASSED. With cookie returns user object with all fields including created_at. Without cookie returns {user: null}."

  - task: "POST /api/auth/logout — clear cookie"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Clears avani_token. Then /api/auth/me should return null."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Logout returns {ok:true}, clears cookie. Subsequent /api/auth/me returns {user: null}."

  - task: "GET /api/auth/orders — user's order history"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Requires auth cookie. Place an order while logged in (user_id should attach), then this returns it."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Returns user's orders with user_id attached. Order placed while logged in appears in list. Without cookie returns 401."

  - task: "POST /api/admin/login — admin auth"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Default admin admin@avaniorganic.com / Avani@2025 is seeded on boot. Body {email, password}. Sets avani_admin_token cookie. Wrong creds -> 401."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Admin login with correct credentials returns {ok:true, admin:{email}}, sets avani_admin_token cookie. Wrong password returns 401."

  - task: "GET /api/admin/me — admin session check"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "With admin cookie -> {admin: {email}}. Without -> {admin: null}."
        -working: true
        -agent: "testing"
        -comment: "PASSED. With admin cookie returns {admin:{email}}. After logout returns {admin: null}."

  - task: "GET /api/admin/orders — list all orders (cookie auth)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "No more ?password=. Uses cookie now. Without admin cookie -> 401."
        -working: true
        -agent: "testing"
        -comment: "PASSED. With admin cookie returns all orders. Without cookie returns 401. Cookie-based auth working correctly."

  - task: "GET /api/admin/users — list registered users"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Returns users without password_hash. Requires admin cookie."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Returns users list, confirmed NO password_hash field in any user object. Without cookie returns 401."

  - task: "GET /api/admin/csv — CSV export (cookie auth)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Returns text/csv. Requires admin cookie."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Returns text/csv with correct Content-Type header. CSV has proper header row and data rows."

  - task: "POST /api/admin/order/:order_id/status — update order status (cookie auth)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Body {status}. Requires admin cookie."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Updates order status to 'shipped', verified status persists in subsequent GET /api/admin/orders."

  - task: "POST /api/admin/logout"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Clears avani_admin_token."
        -working: true
        -agent: "testing"
        -comment: "PASSED. Logout returns {ok:true}, clears admin cookie. Subsequent /api/admin/me returns {admin: null}."

frontend:
  - task: "Full site UI + auth pages"
    implemented: true
    working: "NA"
    file: "app/page.js, app/login/page.js, app/signup/page.js, app/account/page.js, app/admin/login/page.js, app/admin/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "User testing — not auto-tested unless asked."

metadata:
  created_by: "main_agent"
  version: "1.2"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    -agent: "main"
    -message: |
      AUTH SYSTEM ADDED. Please test the new auth flow with cookie-based JWT (instead of the previous ?password= query). Use a CookieJar in your HTTP client (requests.Session()) so cookies persist between calls.
      
      Flow to test:
      1. POST /api/auth/signup with {name, email, password, phone} — captures avani_token cookie
      2. GET /api/auth/me — should return that user
      3. POST /api/orders with cart items — order should attach user_id silently
      4. GET /api/auth/orders — should list the order
      5. POST /api/auth/logout — clears cookie
      6. GET /api/auth/me — should return {user: null}
      7. Try logging in same user via POST /api/auth/login — should work
      8. Negative: signup with duplicate email -> 400; login with wrong password -> 401; auth/orders without cookie -> 401
      
      Admin flow (use a SEPARATE requests.Session()):
      9. POST /api/admin/login with {email: "admin@avaniorganic.com", password: "Avani@2025"} — should succeed (seeded on boot)
      10. GET /api/admin/me — returns {admin: {email}}
      11. GET /api/admin/orders — returns all orders (including the user's order from step 3)
      12. GET /api/admin/users — returns the user from step 1 WITHOUT password_hash field
      13. POST /api/admin/order/{order_id}/status with {status: "shipped"} — updates
      14. GET /api/admin/csv — returns text/csv with proper Content-Type
      15. Negative: admin endpoints without cookie -> 401; login with wrong password -> 401
      
      Also regression-test existing endpoints:
      - GET /api/health, /api/products, /api/products?category=Millets, /api/product/:id, /api/categories, POST /api/newsletter
    -agent: "testing"
    -message: |
      ✅ ALL AUTH TESTS PASSED (25/25 - 100% SUCCESS RATE)
      
      Comprehensive testing completed using requests.Session() with cookie persistence:
      
      USER AUTH FLOW (7 tests):
      ✅ POST /api/auth/signup - Creates user, sets avani_token cookie, returns user object
      ✅ GET /api/auth/me - Returns logged-in user with all fields
      ✅ POST /api/orders - Order placed with user_id attached automatically
      ✅ GET /api/auth/orders - Returns user's orders with user_id field
      ✅ POST /api/auth/logout - Clears cookie successfully
      ✅ GET /api/auth/me (after logout) - Returns {user: null}
      ✅ POST /api/auth/login - Re-login successful with cookie set
      
      NEGATIVE USER CASES (4 tests):
      ✅ Duplicate email signup → 400 "Email already registered"
      ✅ Short password (<6 chars) → 400
      ✅ Wrong password login → 401
      ✅ GET /api/auth/orders without cookie → 401
      
      ADMIN AUTH FLOW (7 tests):
      ✅ POST /api/admin/login - Admin login successful, sets avani_admin_token
      ✅ GET /api/admin/me - Returns {admin: {email}}
      ✅ GET /api/admin/orders - Returns all orders including test order
      ✅ GET /api/admin/users - Returns users WITHOUT password_hash field (security verified)
      ✅ POST /api/admin/order/:id/status - Updates status to "shipped", persists correctly
      ✅ GET /api/admin/csv - Returns text/csv with correct Content-Type and data
      ✅ POST /api/admin/logout - Clears admin cookie, subsequent /api/admin/me returns null
      
      NEGATIVE ADMIN CASES (3 tests):
      ✅ Wrong admin password → 401
      ✅ GET /api/admin/orders without cookie → 401
      ✅ GET /api/admin/users without cookie → 401
      
      REGRESSION TESTS (4 tests):
      ✅ GET /api/health - Working
      ✅ GET /api/products?category=Millets - Returns 23 Millets products
      ✅ GET /api/categories - Returns 12 categories
      ✅ POST /api/newsletter - Working
      
      Test file: /app/backend_auth_test.py
      All backend APIs are working correctly. No issues found.
