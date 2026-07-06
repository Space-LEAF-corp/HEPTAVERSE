// PantherPay - Advanced Payment System
class PantherPay {
  constructor() {
    this.transactions = new Map();
    this.loadTransactions();
  }

  loadTransactions() {
    const stored = localStorage.getItem('panther_pay_transactions');
    if (stored) {
      this.transactions = new Map(JSON.parse(stored));
    }
  }

  saveTransactions() {
    localStorage.setItem('panther_pay_transactions', JSON.stringify([...this.transactions]));
  }

  generateTransactionId() {
    return 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  authorizePayment(amount, description, cardToken) {
    if (amount <= 0) {
      return { success: false, message: 'Invalid amount' };
    }

    const user = pantherAuth.getCurrentUser();
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    const wallet = user.pantherPayWallet;
    if (wallet.balance < amount) {
      return { success: false, message: 'Insufficient funds' };
    }

    const txnId = this.generateTransactionId();
    const transaction = {
      id: txnId,
      amount,
      description,
      cardToken,
      status: 'authorized',
      timestamp: new Date().toISOString(),
      user: user.username,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };

    this.transactions.set(txnId, transaction);
    this.saveTransactions();

    return { success: true, transaction };
  }

  capturePayment(transactionId) {
    const transaction = this.transactions.get(transactionId);
    if (!transaction) {
      return { success: false, message: 'Transaction not found' };
    }

    if (transaction.status !== 'authorized') {
      return { success: false, message: 'Transaction cannot be captured' };
    }

    const user = pantherAuth.getCurrentUser();
    if (!user || user.username !== transaction.user) {
      return { success: false, message: 'Unauthorized transaction' };
    }

    // Deduct from wallet
    user.pantherPayWallet.balance -= transaction.amount;
    transaction.status = 'captured';
    transaction.capturedAt = new Date().toISOString();

    this.transactions.set(transactionId, transaction);
    this.saveTransactions();

    // Update user in auth
    pantherAuth.users.set(user.username, user);
    pantherAuth.saveUsers();
    sessionStorage.setItem('panther_session', JSON.stringify(user));

    return { success: true, transaction };
  }

  voidPayment(transactionId) {
    const transaction = this.transactions.get(transactionId);
    if (!transaction) {
      return { success: false, message: 'Transaction not found' };
    }

    const user = pantherAuth.getCurrentUser();
    if (!user || user.username !== transaction.user) {
      return { success: false, message: 'Unauthorized' };
    }

    transaction.status = 'voided';
    transaction.voidedAt = new Date().toISOString();

    this.transactions.set(transactionId, transaction);
    this.saveTransactions();

    return { success: true, transaction };
  }

  getTransactionHistory(limit = 10) {
    const user = pantherAuth.getCurrentUser();
    if (!user) return [];

    return Array.from(this.transactions.values())
      .filter(txn => txn.user === user.username)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  sendMoney(recipientUsername, amount, memo) {
    const sender = pantherAuth.getCurrentUser();
    if (!sender) {
      return { success: false, message: 'Sender not authenticated' };
    }

    if (sender.pantherPayWallet.balance < amount) {
      return { success: false, message: 'Insufficient funds for transfer' };
    }

    const recipient = pantherAuth.users.get(recipientUsername);
    if (!recipient) {
      return { success: false, message: 'Recipient not found' };
    }

    const transferId = 'transfer_' + this.generateTransactionId();
    const transfer = {
      id: transferId,
      from: sender.username,
      to: recipientUsername,
      amount,
      memo,
      status: 'completed',
      timestamp: new Date().toISOString()
    };

    // Deduct from sender
    sender.pantherPayWallet.balance -= amount;
    // Add to recipient
    recipient.pantherPayWallet.balance += amount;

    // Update both users
    pantherAuth.users.set(sender.username, sender);
    pantherAuth.users.set(recipientUsername, recipient);
    pantherAuth.saveUsers();

    // Update current session
    if (sender.username === pantherAuth.currentUser.username) {
      sessionStorage.setItem('panther_session', JSON.stringify(sender));
    }

    this.transactions.set(transferId, transfer);
    this.saveTransactions();

    return { success: true, transfer };
  }
}

const pantherPay = new PantherPay();