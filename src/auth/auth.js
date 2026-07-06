// Simple local authentication system
class HeptaverseAuth {
  constructor() {
    this.users = new Map();
    this.currentUser = null;
    this.loadUsers();
  }

  loadUsers() {
    const stored = localStorage.getItem('heptaverse_users');
    if (stored) {
      this.users = new Map(JSON.parse(stored));
    } else {
      // Default demo user
      this.users.set('admin', {
        username: 'admin',
        password: this.hashPassword('heptaverse123'),
        realm: 'Raptor',
        email: 'admin@heptaverse.local'
      });
      this.saveUsers();
    }
  }

  saveUsers() {
    localStorage.setItem('heptaverse_users', JSON.stringify([...this.users]));
  }

  hashPassword(password) {
    return btoa(password); // Simple encoding for local use
  }

  register(username, password, email) {
    if (this.users.has(username)) {
      return { success: false, message: 'User already exists' };
    }
    this.users.set(username, {
      username,
      password: this.hashPassword(password),
      realm: 'Raptor',
      email,
      createdAt: new Date().toISOString()
    });
    this.saveUsers();
    return { success: true, message: 'Registration successful' };
  }

  login(username, password) {
    const user = this.users.get(username);
    if (!user || user.password !== this.hashPassword(password)) {
      return { success: false, message: 'Invalid credentials' };
    }
    this.currentUser = user;
    sessionStorage.setItem('heptaverse_session', JSON.stringify(user));
    return { success: true, user };
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('heptaverse_session');
  }

  isLoggedIn() {
    const session = sessionStorage.getItem('heptaverse_session');
    if (session) {
      this.currentUser = JSON.parse(session);
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

const auth = new HeptaverseAuth();
