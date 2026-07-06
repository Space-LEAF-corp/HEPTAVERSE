# 🐆 Panther OS - Predator-Grade Operating System

## Overview

Panther OS is a sleek, dark-themed predator operating system built on the Heptaverse architecture. It features aggressive design elements, apex performance, and an integrated payment system called **PantherPay**.

## Features

### 🎨 Design
- **Dark Predator Aesthetic**: Sleek, aggressive UI with orange/cyber accents
- **Animated Glows**: Dynamic background elements with floating orb effects
- **Smooth Interactions**: Glass morphism effects and cyber-inspired design patterns
- **Responsive Layout**: Works seamlessly on desktop and mobile devices

### 🔐 Authentication
- **Predator Profiles**: Create and manage hunter identities
- **Secure Login**: Session-based authentication with local storage
- **Profile Classes**: Scout, Apex, and custom predator classifications
- **Email Verification**: Hunter email required for registration

### 💳 PantherPay - Advanced Payment System

PantherPay is Panther OS's payment solution, similar to Apple Pay but tailored for the predator ecosystem.

#### Features:
- **Digital Wallet**: Store and manage funds securely
- **Card Management**: Multiple payment methods
- **Payment Authorization**: 7-day authorization holds for transactions
- **Money Transfer**: Send funds between predators instantly
- **Transaction History**: Complete audit trail of all transfers
- **Real-time Balance**: Live wallet balance display
- **Biometric Ready**: Framework for biometric authentication

#### Technical Implementation:
```javascript
// Initialize payment
const auth = pantherPay.authorizePayment(amount, description, cardToken);

// Capture payment
if (auth.success) {
  const capture = pantherPay.capturePayment(auth.transaction.id);
}

// Send money to another predator
const transfer = pantherPay.sendMoney(recipientUsername, amount, memo);

// Get transaction history
const history = pantherPay.getTransactionHistory(limit);
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Space-LEAF-corp/HEPTAVERSE.git
cd HEPTAVERSE

# 2. Start Panther OS server
node panther-server.js

# 3. Open in browser
# Navigate to http://localhost:3001
```

### Default Credentials

**Predator ID**: `predator`  
**Access Code**: `panther123`

## File Structure

```
HEPTAVERSE/
├── public/
│   ├── panther-signin.html          # Login page with predator UI
│   └── panther-dashboard.html       # Main control center with PantherPay
├── src/
│   ├── auth/
│   │   └── panther-auth.js          # Authentication system
│   └── payment/
│       └── panther-pay.js           # PantherPay payment system
├── panther-server.js                # Dedicated Panther OS server
└── README-PANTHER.md                # This file
```

## API Reference

### Authentication (panther-auth.js)

```javascript
// Login
pantherAuth.login(username, password)

// Register
pantherAuth.register(username, password, email)

// Logout
pantherAuth.logout()

// Check login status
pantherAuth.isLoggedIn()

// Get current user
pantherAuth.getCurrentUser()

// Get wallet
pantherAuth.getPantherPayWallet()
```

### Payments (panther-pay.js)

```javascript
// Authorize payment
pantherPay.authorizePayment(amount, description, cardToken)

// Capture authorized payment
pantherPay.capturePayment(transactionId)

// Void authorized payment
pantherPay.voidPayment(transactionId)

// Send money
pantherPay.sendMoney(recipientUsername, amount, memo)

// Get transaction history
pantherPay.getTransactionHistory(limit)
```

## Security Considerations

⚠️ **Note**: This is a local development system. For production:

1. **Encryption**: Implement proper password hashing (bcrypt, argon2)
2. **Backend**: Move to secure server-side validation
3. **HTTPS**: Use SSL/TLS for all communications
4. **Biometric**: Integrate device-native biometric APIs
5. **PCI-DSS**: Ensure compliance for payment processing
6. **Rate Limiting**: Implement request throttling
7. **Audit Logging**: Log all transactions securely

## Customization

### Changing Colors

Edit CSS variables in `.html` files:

```css
:root {
  --panther-accent: #ff3d00;      /* Primary orange */
  --panther-glow: #ff6b35;        /* Glow effect */
  --panther-cyber: #00ff88;       /* Cyber green */
}
```

### Adding New Payment Methods

1. Create new card object in `panther-auth.js`
2. Extend `pantherPay.js` with new payment logic
3. Update dashboard UI in `panther-dashboard.html`

### Custom Predator Classes

Modify user initialization in `panther-auth.js`:

```javascript
predatorClass: 'Custom-Class'  // Scout, Apex, Hunter, etc.
```

## Future Enhancements

- [ ] Biometric authentication (fingerprint, face recognition)
- [ ] QR code payment requests
- [ ] Multi-currency support
- [ ] Transaction encryption
- [ ] Predator-to-predator transfer limits
- [ ] Payment analytics dashboard
- [ ] Real-time notifications
- [ ] Fraud detection system

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, open a GitHub issue or contact Space-LEAF Corp.

---

**Panther OS v1.0** | *Predator-grade Security & Performance*  
© 2026 Space-LEAF Corporation
