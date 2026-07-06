// Panther OS Authentication System
class PantherAuth {
  constructor() {
    this.users = new Map();
    this.currentUser = null;
    this.loadUsers();
  }

  loadUsers() {
    const stored = localStorage.getItem('panther_users');
    if (stored) {
      this.users = new Map(JSON.parse(stored));
    } else {
      // Default predator profile
      this.users.set('predator', {
        username: 'predator',
        password: this.hashPassword('panther123'),
        email: 'apex@panther.local',
        predatorClass: 'Apex',
        createdAt: new Date().toISOString(),
        pantherPayWallet: {
          balance: 5000,
          cardToken: this.generateCardToken(),
          cards: [
            {
              id: 'card_001',
              lastFour: '4242',
              expiry: '12/25',
              brand: 'PantherPay'
            }
          ]
        }
      });
      this.saveUsers();
    }
  }

  saveUsers() {
    localStorage.setItem('panther_users', JSON.stringify([...this.users]));
  }

  hashPassword(password) {
    return btoa(password);
  }

  generateCardToken() {
    return 'pp_' + Math.random().toString(36).substr(2, 20).toUpperCase();
  }

  register(username, password, email) {
    if (this.users.has(username)) {
      return { success: false, message: 'Predator profile already exists' };
    }
    
    if (!email) {
      return { success: false, message: 'Hunter email required' };
    }

    this.users.set(username, {
      username,
      password: this.hashPassword(password),
      email,
      predatorClass: 'Scout',
      createdAt: new Date().toISOString(),
      pantherPayWallet: {
        balance: 1000,
        cardToken: this.generateCardToken(),
        cards: [
          {
            id: 'card_' + Math.random().toString(36).substr(2, 9),
            lastFour: Math.random().toString().substr(2, 4),
            expiry: '12/26',
            brand: 'PantherPay'
          }
        ]
      }
    });
    this.saveUsers();
    return { success: true, message: 'Profile created' };
  }

  login(username, password) {
    const user = this.users.get(username);
    if (!user || user.password !== this.hashPassword(password)) {
      return { success: false, message: 'Invalid predator credentials' };
    }
    this.currentUser = user;
    sessionStorage.setItem('panther_session', JSON.stringify(user));
    return { success: true, user };
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('panther_session');
  }

  isLoggedIn() {
    const session = sessionStorage.getItem('panther_session');
    if (session) {
      this.currentUser = JSON.parse(session);
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getPantherPayWallet() {
    return this.currentUser?.pantherPayWallet || null;
  }
}

const pantherAuth = new PantherAuth();