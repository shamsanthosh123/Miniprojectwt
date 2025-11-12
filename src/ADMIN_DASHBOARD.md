# 📊 Admin Dashboard - User Guide

## Overview

The GiveHope Admin Dashboard provides comprehensive donor management capabilities with real-time statistics, advanced filtering, and data export features.

## 🚀 Accessing the Admin Dashboard

### Step 1: Login as Admin

1. Click **"Login"** button in the header
2. Enter admin credentials:
   - **Email**: `admin@donation.com`
   - **Password**: `admin123`
3. Click **"Sign In"**

### Step 2: Navigate to Dashboard

After successful login, you'll see:
- **"Admin Dashboard"** button in the header
- **"Logout"** button
- Click **"Admin Dashboard"** to access the donor management page

## 📋 Dashboard Features

### 1. Statistics Overview

Four key metrics displayed at the top:

- **Total Donations**: Total number of completed donations
- **Total Amount**: Sum of all donation amounts (₹)
- **Total Donors**: Number of unique donors
- **Average Donation**: Average amount per donation

### 2. Search & Filter

**Search Functionality:**
- Search by donor name
- Search by email address
- Search by phone number
- Real-time search results

**Status Filter:**
- **All Status** - Show all donations
- **Completed** - Successfully processed donations
- **Pending** - Donations awaiting processing
- **Failed** - Failed payment transactions

### 3. Donor Information Table

The table displays comprehensive donor details:

| Column | Information |
|--------|-------------|
| **Donor Name** | Full name + visibility badge (Public/Private) |
| **Contact** | Email and phone with clickable links |
| **Campaign** | Campaign title and category |
| **Amount** | Donation amount in ₹ |
| **Status** | Payment status with color-coded badge |
| **Transaction ID** | Unique transaction identifier |
| **Date** | Date and time of donation |
| **Message** | Optional donor message |

### 4. Action Buttons

**Refresh** 🔄
- Reload the latest donor data
- Updates statistics and donor list

**Export CSV** 📥
- Download all donor data as CSV file
- File includes: Name, Email, Phone, Amount, Campaign, Status, Transaction ID, Date
- Filename format: `donors-YYYY-MM-DD.csv`

### 5. Pagination

- Navigate through donor pages
- 20 donors per page
- Shows total count and current range
- Previous/Next buttons
- Page number navigation

## 💡 Common Tasks

### View All Donors

1. Navigate to Admin Dashboard
2. All donors are displayed by default
3. Scroll through the table to view details

### Search for a Specific Donor

1. Click the search box
2. Type donor name, email, or phone
3. Results update automatically
4. Clear search to view all donors again

### Filter by Payment Status

1. Click the **"Filter by status"** dropdown
2. Select status (All, Completed, Pending, Failed)
3. Table updates to show matching donors

### Export Donor Data

1. Apply any desired filters/search
2. Click **"Export CSV"** button
3. CSV file downloads automatically
4. Open in Excel, Google Sheets, or any spreadsheet app

### View Donor Contact Information

**Email a Donor:**
- Click on the email address in the Contact column
- Your email client opens automatically

**Call a Donor:**
- Click on the phone number in the Contact column
- Mobile devices will prompt to call

### Check Transaction Details

- Transaction IDs are displayed in the table
- Copy transaction ID for payment verification
- Use for customer support or reconciliation

## 🎨 Visual Indicators

### Status Badges

- **✅ Completed** (Green) - Payment successfully processed
- **⏰ Pending** (Gray) - Awaiting payment confirmation
- **⚠️ Failed** (Red) - Payment transaction failed

### Visibility Badges

- **Public** - Donor name visible on campaign page
- **Private** - Donor chooses to remain anonymous

### Category Badges

- **Schools** - Education-related campaigns
- **Children** - Child welfare campaigns
- **Health** - Healthcare campaigns
- **Other** - Miscellaneous campaigns

## 📊 Statistics Details

### Total Donations
- Count of all completed donation transactions
- Excludes pending and failed payments
- Updates in real-time with new donations

### Total Amount
- Sum of all completed donations
- Displayed in Indian Rupees (₹)
- Formatted with thousands separators

### Total Donors
- Count of unique donors (by email)
- A donor donating multiple times counts as one
- Tracks distinct contributors

### Average Donation
- Total Amount ÷ Total Donations
- Helps understand typical donation size
- Useful for campaign planning

## 🔒 Security Features

### Authentication Required
- Must be logged in as admin to access
- Automatic redirect if not authenticated
- Session-based token authentication

### Auto-Logout on Token Expiry
- JWT tokens expire after 30 days
- Automatic logout on expired token
- Redirects to home page for re-login

### Secure Data Display
- Sensitive data shown only to authenticated admins
- Contact information protected from public view
- Transaction IDs for verified tracking

## 📱 Responsive Design

The dashboard is fully responsive:

- **Desktop**: Full table view with all columns
- **Tablet**: Scrollable table with touch support
- **Mobile**: Horizontal scroll for table viewing

## 🔧 Troubleshooting

### "Please login to access admin dashboard"

**Solution**: 
1. Click Login in header
2. Enter admin credentials
3. Try accessing dashboard again

### "Failed to load dashboard data"

**Solution**:
1. Check backend server is running (port 5000)
2. Verify MongoDB connection
3. Click Refresh button to retry
4. Check browser console for errors

### Empty donor list

**Solution**:
1. Verify donations exist in database
2. Check if filters are applied
3. Clear search term
4. Set status filter to "All Status"
5. Click Refresh to reload data

### Export not working

**Solution**:
1. Ensure browser allows downloads
2. Check popup blocker settings
3. Try different browser
4. Verify donors exist in current view

### Pagination not showing

**Solution**:
- Pagination only appears when total donors > 20
- If you have fewer donors, pagination is hidden
- This is normal behavior

## 💻 Technical Details

### API Endpoints Used

- `GET /api/admin/summary` - Dashboard statistics
- `GET /api/admin/donors` - Donor list with pagination
- Requires JWT token in Authorization header

### Data Refresh

- Manual refresh via Refresh button
- No auto-refresh (prevents database overload)
- Recommended to refresh periodically

### Performance

- 20 donors per page for optimal loading
- Efficient database queries with indexing
- Minimal data transferred per request

## 📈 Best Practices

1. **Regular Monitoring**: Check dashboard daily for new donations
2. **Export Backups**: Export donor data weekly for records
3. **Verify Transactions**: Cross-check transaction IDs periodically
4. **Search Efficiently**: Use specific search terms for faster results
5. **Filter First**: Apply filters before searching for better performance

## 🎯 Next Steps

After mastering the donor dashboard:

1. Explore campaign management features
2. Review detailed donation reports
3. Analyze donor trends and patterns
4. Plan fundraising strategies based on data
5. Contact top donors for appreciation

## 🆘 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Verify backend server is running
3. Check browser console for errors
4. Review backend logs for API errors
5. Ensure MongoDB is connected

---

**Happy Managing! 🎉**

Use this powerful dashboard to make data-driven decisions and grow your donation platform.
