# Helpful Project Notes

## Folder Structure
src/
├── api/
│   ├── supabase/
│   │   ├── client.js               # Only creates the supabase instance
│   │   ├── users.js        
│   │   └── components.js
│   └── external/
│       └── otherAPI.js
│
│
├── auth/
│   ├── hooks/
│   │   ├── useAuth.js                  # user/session state + listener
│   │   ├── useMagicLink.js             # Magic link send + verify logic
│   │   ├── useGithubLogin.js           # github verification
│   │   └── usePasswordAuth.js          # email and password
│   │
│   └── providers/
│   │   └── AuthProvider.js             # wrapp app for global auth context
│   │
│   └── boundries/                      # block rendering until auth is ready
│   │   └── AuthBoundary.js             
│   │
│   └── routes/                         # route gards and navigation enforcement
│       ├── ProtectedRoute.js           
│       └── PublicOnlyRoute.js            
│
│
├── hooks/                          # Custom hooks that wrap query/mutation API calls
│   └── supabase/
│       ├── useUsers.js
│       └── useComponents.js
│
│
├── utils/                          # Pure utility functions
│   ├── formatDate.js
│   ├── logger.js
│   └── storage.js
│
│
├── components/                     # generic UI components (buttons, modals, loaders, inputs, layout shells)
│   └── buttons/
│       ├── css/
│       │   ├── PrimaryBtn.module.css
│       │   └── SecondaryBtn.module.css
│       ├── PrimaryBtn.jsx
│       └── SecondaryBtn.jsx
│
│
├── features/                               # Feature modules (data + UI together)
│   └── components/
│       ├── ComponentView/                  # UI specific to the components feature
│       │   ├── index.jsx
│       │   └── ComponentView.module.css
│       └── ComponentEdit/               
│           ├── index.jsx
│           ├── ComponentEdit.module.css
│           └── useComponentEdit.js         # (Extracted UI component logic)
│
│
├── context/                                # Global state if needed
│   └── AuthContext.jsx
│
│
├── pages/                          # Route-level pages
│   ├── css/
│   │   ├── Dashboard.module.css
│   │   ├── SignUp.module.css
│   │   ├── SignIn.module.css
│   │   ├── ComponentViewPage.module.css
│   │   ├── ComponentAddPage.module.css
│   │   └── ComponentEditPage.module.css
│   ├── Dashboard.jsx
│   ├── SignUp.jsx
│   ├── SignIn.jsx
│   ├── ComponentViewPage.jsx           # read :id from router params
│   ├── ComponentAddPage.jsx            
│   └── ComponentEditPage.jsx
│
│
├── theme/                      # Global CSS + resets + themes
│   ├── typography.css
│   └── global.css
│
│
├── App.jsx
└── main.jsx


## Naming Conventions
|       Thing       |               Convention                  |           Example                  |
|     Components    |       PascalCase folder + file            |     `ComponentView/index.jsx`      |
|     CSS Modules   |       Same name as component              |     `ComponentView.module.css`     |
|     Hooks         |       camelCase with `use` prefix         |     `useUsers`, `useComponents`    |
|     API Files     |   domain-named, plural for collections    |     `users`, `components`          |
|     Utils         |       verb or format based                |     `formatDate`                   |
|    API Functions  |       action-based, async, verb first     |     `getUserById()`                |



## Pattern: API Layer > Hooks Layer > View Layer
api/supabase/users.js
`getUsers()` > GET users from Supabase
`getComponents()` > GET components from Supabase

hooks/supabase/useUsers.js
`useUsers()` > GET users with React Query
`useComponents()` > GET components with React Query

In Component
`const { data: users, isLoading, error } = useUsers()`
`const { data: components, isLoading, error } = useComponents()`



## I'm stupid and need this
#### `npm run dev`