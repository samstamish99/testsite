// Mock Authentication System
const auth = {
    // Mock users database (in real app, this would be on a server)
    users: JSON.parse(localStorage.getItem('mockUsers') || '[]'),
    
    // Current user session
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
    
    // Initialize default users if none exist
    init() {
        if (this.users.length === 0) {
            this.users = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123',
                    company: 'Acme Inc.',
                    role: 'admin',
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    password: 'password123',
                    company: 'Tech Corp',
                    role: 'member',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveUsers();
        }
    },
    
    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('mockUsers', JSON.stringify(this.users));
    },
    
    // Save current user session
    saveSession(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    
    // Sign up new user
    signup(name, email, password, company) {
        // Check if email already exists
        if (this.users.find(u => u.email === email)) {
            return false;
        }
        
        const newUser = {
            id: String(Date.now()),
            name,
            email,
            password, // In real app, this would be hashed
            company: company || 'Personal',
            role: 'member',
            createdAt: new Date().toISOString()
        };
        
        this.users.push(newUser);
        this.saveUsers();
        this.saveSession(newUser);
        return true;
    },
    
    // Login
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            // Don't store password in session
            const { password: _, ...userSession } = user;
            this.saveSession(userSession);
            return true;
        }
        return false;
    },
    
    // Logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    },
    
    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    },
    
    // Get current user
    getUser() {
        return this.currentUser;
    },
    
    // Update user profile
    updateProfile(updates) {
        if (!this.currentUser) return false;
        
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            Object.assign(this.users[userIndex], updates);
            Object.assign(this.currentUser, updates);
            this.saveUsers();
            this.saveSession(this.currentUser);
            return true;
        }
        return false;
    }
};

// Initialize auth on load
auth.init();

