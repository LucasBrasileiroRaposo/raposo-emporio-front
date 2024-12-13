const BACKEND_URL = 'http://127.0.0.1:8080';

const app = {
    init() {
        this.loginView = document.getElementById('login-view');
        this.signupView = document.getElementById('signup-view');
        this.userListView = document.getElementById('user-list-view');
        this.updateUserView = document.getElementById('update-user-view');
        this.loginForm = document.getElementById('login-form');
        this.signupForm = document.getElementById('signup-form');
        this.updateUserForm = document.getElementById('update-user-form');
        this.userTable = document.getElementById('user-table').querySelector('tbody');
        this.switchToSignup = document.getElementById('switch-to-signup');
        this.switchToLogin = document.getElementById('switch-to-login');
        this.cancelUpdateButton = document.getElementById('cancel-update');
        this.logoutButton = document.getElementById('logout');

        this.loginForm.addEventListener('submit', this.login.bind(this));
        this.signupForm.addEventListener('submit', this.signup.bind(this));
        this.updateUserForm.addEventListener('submit', this.updateUser.bind(this));
        this.switchToSignup.addEventListener('click', () => this.showView('signup'));
        this.switchToLogin.addEventListener('click', () => this.showView('login'));
        this.cancelUpdateButton.addEventListener('click', () => this.showView('user-list'));
        this.logoutButton.addEventListener('click', this.logout.bind(this));
        document.addEventListener('click', this.handleTableActions.bind(this));

        const token = localStorage.getItem('token');
        if (token) {
            this.loadUsers();
            this.showView('user-list');
        } else {
            this.showView('login');
        }
    },

    showView(view) {
        this.loginView.classList.add('hidden');
        this.signupView.classList.add('hidden');
        this.userListView.classList.add('hidden');
        this.updateUserView.classList.add('hidden');

        if (view === 'login') this.loginView.classList.remove('hidden');
        if (view === 'signup') this.signupView.classList.remove('hidden');
        if (view === 'user-list') this.userListView.classList.remove('hidden');
        if (view === 'update-user') this.updateUserView.classList.remove('hidden');
    },

    async login(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch(`${BACKEND_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                this.loadUsers();
                this.showView('user-list');
            } else {
                alert(data.error);
            }
        } catch {
            alert('Erro ao fazer login.');
        }
    },

    async signup(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const birth_date = document.getElementById('birth_date').value;
        const email = document.getElementById('email').value;
        const user_document = document.getElementById('document').value;
        const phone = document.getElementById('phone').value;
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const role = document.getElementById('role').value;
        try {
            const res = await fetch(`${BACKEND_URL}/user/signUp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username,
                    password,
                    email,
                    first_name,
                    last_name,
                    birth_date,
                    document:user_document,
                    phone,
                    country,
                    city,
                    state,
                    role
                 }),
            });
            if (res.ok) {
                alert('Cadastro realizado com sucesso! Faça login.');
                this.showView('login');
            } else {
                const data = await res.json();
                alert(data.error);
            }
        } catch {
            alert('Erro ao realizar cadastro.');
        }
    },

    async loadUsers() {
        try {
            const res = await fetch(`${BACKEND_URL}/user/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await res.json();
            this.userTable.innerHTML = data.response.map(user => `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.country}</td>
                    <td>${user.role}</td>
                    <td class="actions">
                        <button data-id="${user.id}" class="edit-btn">Editar</button>
                        <button data-id="${user.id}" class="delete-btn">Excluir</button>
                    </td>
                </tr>
            `).join('');
        } catch {
            alert('Erro ao carregar usuários.');
        }
    },

    async showUpdateForm(userId) {
        try {
            const res = await fetch(`${BACKEND_URL}/user/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                method: 'GET'
            });
            const data = await res.json();
            const user = data.message;
            if (res.ok) {
                document.getElementById('update-username').value = user.username;
                document.getElementById('update-first_name').value= user.first_name;
                document.getElementById('update-last_name').value = user.last_name;
                document.getElementById('update-birth_date').value = new Date(user.birth_date).toISOString().split('T')[0];
                document.getElementById('update-email').value = user.email;
                document.getElementById('update-document').value = user.document;
                document.getElementById('update-phone').value = user.phone;
                document.getElementById('update-country').value = user.country;
                document.getElementById('update-city').value = user.city;
                document.getElementById('update-state').value = user.state;
                document.getElementById('update-role').value = user.role;

                document.getElementById('update-user-form').dataset.userId = user.id;

                this.showView('update-user');
            } else {
                alert(data.error);
            }
        } catch {
            alert('Erro ao conectar ao servidor.');
        }
    },

    async updateUser(event) {
        event.preventDefault();
        const userId = this.updateUserForm.dataset.userId;
        const username = document.getElementById('update-username').value;
        const password = document.getElementById('update-password').value;
        const first_name = document.getElementById('update-first_name').value;
        const last_name = document.getElementById('update-last_name').value;
        const birth_date = document.getElementById('update-birth_date').value;
        const email = document.getElementById('update-email').value;
        const user_document = document.getElementById('update-document').value;
        const phone = document.getElementById('update-phone').value;
        const country = document.getElementById('update-country').value;
        const city = document.getElementById('update-city').value;
        const state = document.getElementById('update-state').value;
        const role = document.getElementById('update-role').value;


        try {
            const res = await fetch(`${BACKEND_URL}/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ username,
                    password,
                    first_name,
                    last_name,
                    birth_date,
                    email,
                    user_document,
                    phone,
                    country,
                    city,
                    state,
                    role }),
            });
            if (res.ok) {
                alert('Usuário atualizado com sucesso!');
                this.loadUsers();
                this.showView('user-list');
            } else {
                const data = await res.json();
                alert(data.error);
            }
        } catch {
            alert('Erro ao atualizar usuário.');
        }
    },

    async deleteUser(userId) {
        try {

            const res = await fetch(`${BACKEND_URL}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (res.ok) {
                alert('Usuário excluído com sucesso!');
                if (localStorage.getItem('role') !== 'ADMIN') {
                    this.logout();
                    return;
                }
                this.loadUsers();
            } else {
                const data = await res.json();
                alert(data.error);
            }
        } catch {
            alert('Erro ao excluir usuário.');
        }
    },

    async handleTableActions(event) {
        if (event.target.classList.contains('edit-btn')) {
            const userId = event.target.dataset.id;
            this.showUpdateForm(userId);
        }
        if (event.target.classList.contains('delete-btn')) {
            const userId = event.target.dataset.id;
            if (confirm('Tem certeza que deseja excluir este usuário?')) {
                this.deleteUser(userId);
            }
        }
    },

    logout() {
        localStorage.removeItem('token');
        this.showView('login');
    },
};

app.init();