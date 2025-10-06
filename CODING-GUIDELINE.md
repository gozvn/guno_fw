# GUIDELINE CODING - GUNO FRAMEWORK

## Tổng quan về dự án

**Guno Framework** là một dự án full-stack bao gồm:
- **Backend**: Node.js với Express.js, Sequelize ORM, MySQL, Redis
- **Frontend**: Angular 18 với Angular Material, NgRx state management
- **Architecture**: Modular monolith với middleware pattern
- **Technologies**: JWT authentication, Socket.IO, RSA encryption, Docker

---

## 1. BACKEND CODING GUIDELINES

### 1.1. Cấu trúc thư mục Module

Mỗi module trong backend phải tuân theo cấu trúc sau:

```
modules/
  └── [module-name]/
      ├── controllers/
      ├── helpers/
      ├── middlewares/
      ├── migrations/
      ├── models/
      ├── routes/
      ├── seeders/
      └── services/
```

### 1.2. Naming Conventions

#### Files & Folders
- **Folders**: `kebab-case` (vd: `auth`, `core`, `warehouse`)
- **Files**: `camelCase.js` (vd: `authController.js`, `userService.js`)
- **Route files**: `[module-name].route.js` (vd: `auth.route.js`)
- **Model files**: `camelCase.js` (vd: `user.js`, `userAccessToken.js`)

#### Variables & Functions
- **Variables**: `camelCase` (vd: `userData`, `currentUser`)
- **Functions**: `camelCase` (vd: `getUserInfo()`, `getAccessToken()`)
- **Constants**: `UPPER_SNAKE_CASE` (vd: `KEY_ALL_ROUTES`, `STATUS_ACTIVE`)
- **Class names**: `PascalCase` (vd: `CoreModel`, `UserAccessToken`)

#### Database
- **Table names**: `g_[module]_[table_name]` (vd: `g_core_users`, `g_core_roles`)
- **Column names**: `camelCase` (vd: `userId`, `createdAt`)
- **Index names**: `idx_[descriptive_name]` (vd: `idx_cluster`)

### 1.3. Controllers Pattern

```javascript
module.exports = {
    action1: async (req, res) => {
        try {
            // Business logic here
            const result = await someService.doSomething();
            
            return response.jsonEncrypt(req, res, {
                status: 1,
                code: 200,
                data: result
            });
        } catch (error) {
            return response.jsonEncrypt(req, res, {
                status: 0,
                code: 500,
                message: error.message || 'Internal Server Error'
            });
        }
    },

    action2: async (req, res) => {
        // Tương tự...
    }
}
```

**Quy tắc:**
- Luôn sử dụng `response.jsonEncrypt()` để trả về kết quả
- Xử lý lỗi bằng try-catch
- Status: 1 = success, 0 = error
- Code: HTTP status codes

### 1.4. Models Pattern

```javascript
'use strict';
const CoreModel = require("../../../libs/core/model");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ModelName extends CoreModel {
        static associate(models) {
            // Define associations here
        }

        // Custom methods
        getCustomData(field = null) {
            const data = this.customField ? JSON.parse(this.customField) : {};
            return !field ? data : (data[field] || false);
        }
    }

    // Enable/disable cache
    ModelName.cache = false;
    
    // Constants
    ModelName.STATUS_ACTIVE = 1;
    ModelName.STATUS_INACTIVE = 0;

    ModelName.init({
        // Fields definition
    }, {
        sequelize,
        tableName: 'g_module_table_name',
        modelName: 'ModelName'
    });

    return ModelName;
};
```

**Quy tắc:**
- Kế thừa từ `CoreModel` 
- Sử dụng `cache = true/false` để enable/disable cache
- Định nghĩa constants cho status values
- Table name theo format `g_[module]_[table_name]`

### 1.5. Services Pattern

```javascript
const models = require('../../../configs/models');
const { redisCache } = require('../../../libs/cache/redisCache');

const serviceName = {
    getById: async (id) => {
        return await models.ModelName.findByPk(id);
    },

    create: async (data) => {
        try {
            const result = await models.ModelName.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    },

    // Cache methods
    getCacheKey: (identifier) => {
        return `SERVICE_NAME:${identifier}`;
    },

    getFromCache: async (key) => {
        const cached = await redisCache.get(key);
        return cached ? JSON.parse(cached) : null;
    },

    setCache: async (key, data, expireTime = 3600) => {
        return await redisCache.set(key, JSON.stringify(data), expireTime);
    }
};

module.exports = serviceName;
```

### 1.6. Routes Pattern

```javascript
const controller = require('../controllers/controllerName');
const authMiddleware = require('../middlewares/authMiddleware');
const { body, param, query } = require('express-validator');

module.exports = function(app) {
    // GET route
    app.get('/module/endpoint',
        [authMiddleware, otherMiddleware],
        (req, res) => {
            /*  #swagger.tags = ['ModuleName']
                #swagger.description = 'Description'
                #swagger.security = [{ bearer: [] }]
                #swagger.responses[200] = {
                    schema: { "$ref": "#/definitions/ResponseSuccess" },
                    description: "Successfully." 
                }
            */
            return controller.action(req, res);
        }
    );

    // POST route with validation
    app.post('/module/endpoint',
        [authMiddleware, otherMiddleware],
        body('field1').isString().notEmpty(),
        body('field2').isNumeric(),
        (req, res) => {
            return controller.action(req, res);
        }
    );
};
```

### 1.7. Middlewares Pattern

```javascript
module.exports = async (req, res, next) => {
    try {
        // Middleware logic here
        
        // Add data to request
        req.customData = someData;
        
        next();
    } catch (error) {
        return res.status(400).json({
            status: 0,
            code: 400,
            message: "Middleware error message"
        });
    }
};
```

### 1.8. Helpers Pattern

```javascript
module.exports = {
    helperMethod1: (param1, param2 = defaultValue) => {
        // Helper logic
        return result;
    },

    helperMethod2: {
        subMethod: (data) => {
            // Sub helper logic
            return processedData;
        }
    }
};
```

---

## 2. FRONTEND CODING GUIDELINES

### 2.1. Cấu trúc thư mục Module

```
modules/
  └── [module-name]/
      ├── components/
      ├── pages/
      │   └── [page-name]/
      │       ├── _partials/
      │       ├── dialogs/
      │       └── [page-name].component.ts
      ├── services/
      ├── models/
      ├── guards/
      ├── interceptors/
      └── [module-name].module.ts
```

### 2.2. Naming Conventions

#### Files & Components
- **Components**: `kebab-case.component.ts` (vd: `user-detail.component.ts`)
- **Services**: `kebab-case.service.ts` (vd: `authentication.service.ts`)
- **Models**: `kebab-case.model.ts` (vd: `user.model.ts`)
- **Modules**: `kebab-case.module.ts` (vd: `auth.module.ts`)

#### Classes & Variables
- **Classes**: `PascalCase` (vd: `UserComponent`, `AuthenticationService`)
- **Variables**: `camelCase` (vd: `currentUser`, `isLoading`)
- **Constants**: `UPPER_SNAKE_CASE` (vd: `API_ENDPOINTS`)
- **Methods**: `camelCase` (vd: `getUserInfo()`, `onSubmit()`)

#### CSS Classes
- **Utility classes**: `kebab-case` (vd: `m-t-20`, `f-w-600`)
- **Component classes**: `kebab-case` (vd: `user-detail-container`)

### 2.3. Components Pattern

```typescript
import { Component, OnInit, Inject, Injector } from '@angular/core';
import { BaseComponent } from '../../../core/components/base-component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
    selector: 'app-component-name',
    templateUrl: './component-name.component.html',
    styleUrls: ['./component-name.component.scss']
})
export class ComponentNameComponent extends BaseComponent implements OnInit {
    // Properties
    isLoading = false;
    data: any[] = [];
    displayedColumns: string[] = ['column1', 'column2', 'actions'];

    constructor(
        public override activeRoute: ActivatedRoute,
        public override translateService: TranslateService,
        public override authenticationService: AuthenticationService,
        public override injector: Injector,
        private customService: CustomService
    ) {
        super(activeRoute, translateService, authenticationService, injector);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.loadData();
    }

    // Event handlers
    onSelectChange(event: any) {
        // Handle select change
    }

    onSubmit() {
        // Handle form submission
    }

    // Private methods
    private loadData() {
        this.isLoading = true;
        this.customService.getData().subscribe((result: any) => {
            this.data = result?.data ?? [];
            this.isLoading = false;
        });
    }
}
```

**Quy tắc:**
- Kế thừa từ `BaseComponent`
- Sử dụng `override` cho các methods từ parent class
- Properties trước constructor
- Public methods trước private methods
- Sử dụng `?.` và `??` cho safe navigation

### 2.4. Services Pattern

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class CustomService {
    protected apiServerPaths = environment.backendServer.paths;

    constructor(
        private http: HttpClient,
        private backendService: BackendService
    ) {}

    getData(queries: any = {}): Observable<any> {
        const options = {
            params: {
                encryptParam: true,
                ...queries
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.get(
            this.apiServerPaths.module.endpoint,
            options,
            map((response: any) => {
                return {
                    data: response?.data?.items ?? [],
                    count: response?.data?.count ?? 0
                };
            })
        );
    }

    create(data: any): Observable<any> {
        const options = {
            ...data,
            encryptBody: true
        };

        return this.backendService.post(
            this.apiServerPaths.module.create,
            options,
            map((response: any) => response?.data)
        );
    }
}
```

### 2.5. Models Pattern

```typescript
export class ModelName {
    id: number = 0;
    name: string = '';
    status: number = 1;
    createdAt: Date = new Date();

    constructor(data?: any) {
        if (data) {
            this.id = data.id || 0;
            this.name = data.name || '';
            this.status = data.status || 1;
            this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
        }
    }

    // Helper methods
    isActive(): boolean {
        return this.status === 1;
    }

    getDisplayName(): string {
        return this.name || 'N/A';
    }
}
```

---

## 3. CODING STANDARDS

### 3.1. Error Handling

#### Backend
```javascript
// Controllers
try {
    const result = await service.doSomething();
    return response.jsonEncrypt(req, res, {
        status: 1,
        code: 200,
        data: result
    });
} catch (error) {
    console.error('Error in controller:', error);
    return response.jsonEncrypt(req, res, {
        status: 0,
        code: 500,
        message: error.message || 'Internal Server Error'
    });
}

// Services
const serviceMethod = async (data) => {
    try {
        // Service logic
        return result;
    } catch (error) {
        throw new Error(`Service error: ${error.message}`);
    }
};
```

#### Frontend
```typescript
// Components
loadData() {
    this.isLoading = true;
    this.service.getData().subscribe({
        next: (result: any) => {
            this.data = result?.data ?? [];
            this.isLoading = false;
        },
        error: (error) => {
            console.error('Error loading data:', error);
            this.isLoading = false;
            this.showErrorMessage('Failed to load data');
        }
    });
}
```

### 3.2. Authentication & Authorization

#### Backend Middleware
```javascript
// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                status: 0,
                code: 401,
                message: 'Unauthorized'
            });
        }

        const decoded = jwt.verify(token, configs.jwt.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 0,
            code: 401,
            message: 'Invalid token'
        });
    }
};
```

#### Frontend Guards
```typescript
// auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(): boolean {
        if (this.authService.currentUserValue) {
            return true;
        }

        this.router.navigate(['/auth/login']);
        return false;
    }
}
```

### 3.3. Database Queries

```javascript
// Service with cache
const getUserById = async (id) => {
    const cacheKey = `USER:${id}`;
    let user = await redisCache.get(cacheKey);
    
    if (!user) {
        user = await models.User.findByPk(id, {
            include: [{
                model: models.Role,
                attributes: ['name', 'status']
            }]
        });
        
        if (user) {
            await redisCache.set(cacheKey, JSON.stringify(user), 3600);
        }
    } else {
        user = JSON.parse(user);
    }
    
    return user;
};

// Complex queries
const getFilteredData = async (criteria) => {
    const where = {};
    
    if (criteria?.keyword) {
        where.name = {
            [Op.like]: `%${criteria.keyword}%`
        };
    }
    
    if (criteria?.status) {
        where.status = criteria.status;
    }
    
    const options = {
        where,
        include: [...],
        order: [['createdAt', 'DESC']]
    };
    
    if (criteria?.page && criteria?.limit) {
        options.offset = criteria.limit * (criteria.page - 1);
        options.limit = criteria.limit;
    }
    
    return await models.ModelName.findAndCountAll(options);
};
```

### 3.4. API Response Format

#### Backend
```javascript
// Success response
{
    status: 1,
    code: 200,
    data: {
        // Response data
    }
}

// Error response
{
    status: 0,
    code: 400,
    message: "Error message"
}

// List with pagination
{
    status: 1,
    code: 200,
    data: {
        items: [...],
        count: 100,
        page: 1,
        limit: 10
    }
}
```

### 3.5. Environment Configuration

#### Backend (.env)
```bash
# App
APP_ENV=development
APP_NAME=Guno Hub
APP_FRONTEND_URL=http://localhost:4200

# Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=guno_db
MYSQL_USER=root
MYSQL_PASSWORD=password

# JWT
JWT_SECRET=your_secret_key
JWT_TTL=2592000

# Redis
REDIS_CACHE_HOST=localhost
REDIS_CACHE_PORT=6379
```

#### Frontend (environment.ts)
```typescript
export const environment = {
    production: false,
    version: '1.0.0',
    backendServer: {
        host: 'localhost',
        port: 3000,
        ssl: false,
        prefix: '/api/v1',
        paths: {
            auth: {
                login: '/auth/login',
                social: {
                    request: '/auth/{SOCIAL_NAME}/request',
                    callback: '/auth/{SOCIAL_NAME}/callback'
                }
            }
        }
    },
    language: {
        default: 'vi'
    }
};
```

---

## 4. BEST PRACTICES

### 4.1. Security
- Luôn sử dụng JWT cho authentication
- Encrypt sensitive data với RSA
- Validate tất cả input từ client
- Sử dụng HTTPS trong production
- Implement rate limiting cho APIs

### 4.2. Performance
- Sử dụng Redis cache cho data thường xuyên truy cập
- Implement lazy loading cho Angular modules
- Optimize database queries với proper indexing
- Sử dụng pagination cho large datasets
- Minimize bundle size với tree shaking

### 4.3. Code Quality
- Sử dụng TypeScript strict mode
- Implement error boundaries
- Write unit tests cho business logic
- Use ESLint và Prettier cho code formatting
- Maintain code coverage > 80%

### 4.4. Git Workflow
```bash
# Branch naming
feature/module-name-feature-description
bugfix/bug-description
hotfix/critical-bug-description

# Commit messages
feat: add user authentication
fix: resolve database connection issue
docs: update API documentation
refactor: optimize user service queries
```

### 4.5. Documentation
- Comment complex business logic
- Maintain API documentation với Swagger
- Document environment setup
- Keep README updated
- Document deployment procedures

---

## 5. CHECKLIST QUY TRÌNH PHÁT TRIỂN

### Trước khi commit:
- [ ] Code đã được format đúng chuẩn
- [ ] Không có console.log trong production code
- [ ] Error handling đã được implement
- [ ] API documentation đã được cập nhật
- [ ] Environment variables đã được khai báo

### Trước khi deploy:
- [ ] Build project thành công
- [ ] Database migration đã được chạy
- [ ] Environment production đã được config
- [ ] SSL certificates đã được setup
- [ ] Monitoring và logging đã được enable

### Code Review Checklist:
- [ ] Naming conventions đúng chuẩn
- [ ] Security best practices được tuân thủ
- [ ] Performance implications đã được xem xét
- [ ] Error handling adequate
- [ ] Tests cover main scenarios

---

**Lưu ý**: Guideline này dựa trên phân tích source code hiện tại và sẽ được cập nhật theo sự phát triển của dự án.