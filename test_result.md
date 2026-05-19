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
  Avani Organics — premium animated organic grocery e-commerce site for Karnataka brand (BHOOMI Sustainable Development Society).
  ~165 products across 12 categories (Traditional Rice, Millets, Pulses, Flours, Oils, Sweeteners, Salts, Dry Fruits, Spices, Super Foods, Breakfast, Dairy).
  Auto-generated INR prices, Cart, Checkout (COD + Razorpay demo), Admin dashboard with CSV export.

backend:
  - task: "GET /api/products — list, filter by category, search by q, sort"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Returns {products, total}. Verified curl returns Traditional Rice list."
        -working: true
        -agent: "testing"
        -comment: "✅ All tests passed: (1) Products list returns 164 items with correct structure. (2) Category filter for 'Traditional Rice' returns 23 items, all correctly filtered. (3) Search query 'ragi' returns 4 items, all containing 'ragi' in name/category. (4) Sort by price-asc works correctly (first item ₹25). (5) Sort by price-desc works correctly (first item ₹2105)."
  - task: "GET /api/categories"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Returns 12 categories. Curl confirmed."
        -working: true
        -agent: "testing"
        -comment: "✅ Test passed: Returns exactly 12 categories including Traditional Rice, Millets, Pulses, Flours, Oils & Oil Seeds, Sweeteners, Salts, Dry Fruits, Spices, Super Foods, Breakfast, Dairy."
  - task: "GET /api/product/:id with similar"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Returns 404 for invalid id, product + similar for valid."
        -working: true
        -agent: "testing"
        -comment: "✅ Both tests passed: (1) Valid product ID returns product details with up to 8 similar products from same category. (2) Invalid product ID returns 404 with error message."
  - task: "POST /api/orders — create order, persist in MongoDB"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Generates AVN-* order_id. Stores in db.orders. Returns {ok, order_id, order}."
        -working: true
        -agent: "testing"
        -comment: "✅ Test passed: Order created successfully with realistic data (name: Rajesh Kumar, phone: 9876543210, email: rajesh.kumar@example.com). Generated order_id format AVN-MPCK0JZN-JYEF. Order persisted in MongoDB and retrievable via admin endpoint."
  - task: "POST /api/newsletter"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Subscribes email; stores in newsletter collection."
        -working: true
        -agent: "testing"
        -comment: "✅ Test passed: Newsletter subscription successful with email priya.sharma@example.com. Returns {ok: true}."
  - task: "Admin: login / list orders / CSV export / update status"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Password protected (ADMIN_PASSWORD=avani2025). GET /api/admin/orders, GET /api/admin/csv, POST /api/admin/order/:order_id/status, POST /api/admin/login."
        -working: true
        -agent: "testing"
        -comment: "✅ All admin tests passed: (1) Login with correct password returns {ok:true}, wrong password returns {ok:false}. (2) GET /api/admin/orders with correct password returns orders list, wrong password returns 401. (3) GET /api/admin/csv with correct password returns CSV with proper Content-Type header and data rows, wrong password returns 401. (4) POST /api/admin/order/:order_id/status successfully updates order status to 'shipped' and persists in database."

frontend:
  - task: "Full site UI"
    implemented: true
    working: "NA"
    file: "app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "All pages render 200. To be tested manually by user first."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    -agent: "main"
    -message: "Avani Organics MVP built. ~165 products seeded, full UI with Home/Shop/Product/Cart/Checkout/About/Admin. Backend uses MongoDB for orders & newsletter. Please test all backend endpoints with realistic payloads — especially POST /api/orders and admin password-protected endpoints (password=avani2025)."
    -agent: "testing"
    -message: "✅ BACKEND TESTING COMPLETE - ALL TESTS PASSED (13/13). Comprehensive testing performed on all endpoints with positive and negative test cases. All endpoints working correctly: Health check, Categories (12), Products list (164 items), Category filtering, Search, Sorting (price-asc/desc), Product details with similar items, Order creation with MongoDB persistence, Newsletter subscription, Admin authentication, Admin orders list with auth, CSV export with proper headers, and Order status updates. Test file: /app/backend_test.py. No critical issues found. Backend is production-ready."
