export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string; // ISO format: YYYY-MM-DD
  tags: string[];
  excerpt: string;
  content: string;
  coverImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with TypeScript in React Applications',
    slug: 'getting-started-with-typescript-react',
    author: 'Priyanshu Chawda',
    date: '2025-04-20',
    tags: ['React', 'TypeScript', 'Frontend'],
    excerpt: 'TypeScript has become the go-to language for building robust React applications. In this article, we will explore how to set up a new React project with TypeScript and the benefits it brings.',
    coverImage: '/images/blog/typescript-react.jpg',
    content: `TypeScript has revolutionized how we build React applications by bringing static typing to JavaScript. This added layer of type safety catches errors during development rather than at runtime, making our applications more robust and easier to maintain.

In this guide, I'll walk you through setting up a React application with TypeScript, exploring the key benefits, and sharing best practices I've learned through experience.

## Why TypeScript with React?

Before diving into the technical setup, let's understand why TypeScript has become increasingly popular in the React ecosystem:

1. **Type Safety**: Catch errors during development rather than at runtime
2. **Better Developer Experience**: Improved autocomplete, inline documentation, and refactoring support
3. **Enhanced Collaboration**: Types serve as documentation, making it easier for teams to work together
4. **Improved Maintainability**: Types make code more predictable and easier to refactor

## Setting Up a New Project

Creating a new React project with TypeScript is straightforward with Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

Alternatively, if you prefer Vite for its faster development experience:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Key TypeScript Patterns in React

### Typing Component Props

Defining prop types is one of the most common TypeScript patterns in React applications:

\`\`\`typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  // Component implementation
};
\`\`\`

### Working with Hooks

TypeScript enhances hooks with better type inference:

\`\`\`typescript
// useState with type inference
const [count, setCount] = useState(0);

// useState with explicit typing
const [user, setUser] = useState<User | null>(null);

// useReducer with TypeScript
type Action = 
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: number };

const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case 'increment':
      return state + action.payload;
    case 'decrement':
      return state - action.payload;
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, 0);
\`\`\`

## Common Challenges and Solutions

While TypeScript brings many benefits, there are common challenges you might face:

### Typing Component Children

\`\`\`typescript
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="layout">{children}</div>;
};
\`\`\`

### Typing Event Handlers

\`\`\`typescript
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};
\`\`\`

### Working with External Libraries

Not all libraries provide TypeScript definitions. For such libraries, you can:
- Check if @types/{library-name} exists
- Create custom type definitions
- Use 'any' as a last resort (though not recommended)

## Conclusion

TypeScript might seem like an additional hurdle at first, but the benefits it brings to your React application far outweigh the initial learning curve. As your application grows, TypeScript helps maintain code quality and makes refactoring much safer and easier.

In the next article, I'll explore more advanced TypeScript patterns for React applications, including handling asynchronous operations, global state management, and component composition.`
  },
  {
    id: '2',
    title: 'Building a Design System with Tailwind CSS',
    slug: 'building-design-system-tailwind-css',
    author: 'Priyanshu Chawda',
    date: '2025-04-10',
    tags: ['Design System', 'Tailwind CSS', 'UI/UX'],
    excerpt: "Learn how to create a consistent and scalable design system using Tailwind CSS, covering everything from typography and colors to custom components and theme switching.",
    coverImage: '/images/blog/design-system.jpg',
    content: `Design systems have become essential for creating cohesive user experiences across web applications. Tailwind CSS, with its utility-first approach, provides an excellent foundation for building flexible and maintainable design systems. In this article, I'll share my approach to creating a comprehensive design system using Tailwind CSS.

## What is a Design System?

A design system is a collection of reusable components, guided by clear standards, that can be assembled to build applications. It typically includes:

- Design tokens (colors, typography, spacing)
- Component library
- Usage guidelines
- Design principles

## Getting Started with Tailwind CSS

First, let's set up Tailwind CSS in our project:

\`\`\`bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Configuring Design Tokens

The first step in building our design system is defining design tokens in the tailwind.config.js file:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          // ... other shades
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          // Secondary color palette
        },
        // ... other color schemes
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Custom font sizes
      },
      spacing: {
        // Custom spacing scale
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
\`\`\`

## Building Component Abstractions

While Tailwind promotes utility classes, creating component abstractions helps maintain consistency:

\`\`\`tsx
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus:ring-primary-500',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${disabledClasses}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
\`\`\`

## Dark Mode Support

One of the advantages of a well-designed system is supporting features like dark mode:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ... rest of the config
}
\`\`\`

## Documentation

A design system is only as good as its documentation. Create a dedicated page showcasing all components, color palettes, typography, and usage examples:

\`\`\`tsx
// DesignSystem.tsx
const DesignSystem = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Design System</h1>
      
      {/* Colors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {/* Primary color swatches */}
          {/* Secondary color swatches */}
          {/* Other color swatches */}
        </div>
      </section>
      
      {/* Typography */}
      {/* ... */}
      
      {/* Components */}
      {/* ... */}
    </div>
  );
};
\`\`\`

## Benefits of This Approach

1. **Consistency**: Design tokens ensure visual consistency throughout the application
2. **Scalability**: Component abstractions make it easy to update the design system
3. **Developer Experience**: Clear documentation and typings improve development workflow
4. **Performance**: Tailwind's purging ensures small CSS bundles in production

## Conclusion

Building a design system with Tailwind CSS allows you to combine the flexibility of utility classes with the structure of a component library. This approach gives you the best of both worlds: rapid development with utilities and long-term maintainability with abstractions.

In future articles, I'll dive deeper into specific aspects of design systems, such as animation patterns, accessibility considerations, and managing design systems across multiple projects.`
  },
  {
    id: '3',
    title: 'Advanced React Patterns for Scalable Applications',
    slug: 'advanced-react-patterns-scalable-applications',
    author: 'Priyanshu Chawda',
    date: '2025-03-28',
    tags: ['React', 'Architecture', 'Best Practices'],
    excerpt: "Explore advanced React design patterns that help build scalable and maintainable applications, from compound components to the render props pattern.",
    coverImage: '/images/blog/react-patterns.jpg',
    content: `As React applications grow in size and complexity, simple component structures often become insufficient. Advanced React patterns help manage this complexity while keeping code maintainable and reusable. In this article, I'll explore several powerful React patterns that have served me well in large-scale applications.

## Beyond Basic Components

Basic React components work well for simpler use cases, but as applications scale, we need more sophisticated patterns. Here are some of the most effective patterns I've used:

## The Compound Component Pattern

Compound components provide an expressive and flexible API for components with complex relationships. Think of them like \`<select>\` and \`<option>\` in HTML.

\`\`\`tsx
// Example of a Tabs component using compound pattern
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabList = ({ children }) => <div className="tab-list">{children}</div>;

const Tab = ({ children, id }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button 
      className={\`tab \${activeTab === id ? 'active' : ''}\`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

const TabPanels = ({ children }) => <div className="tab-panels">{children}</div>;

const TabPanel = ({ children, id }) => {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== id) return null;
  return <div className="tab-panel">{children}</div>;
};

// Assigning components as properties
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

// Usage
function App() {
  return (
    <Tabs defaultTab="tab1">
      <Tabs.TabList>
        <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel id="tab1">Content for Tab 1</Tabs.TabPanel>
        <Tabs.TabPanel id="tab2">Content for Tab 2</Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  );
}
\`\`\`

## The Render Props Pattern

Render props is a technique where a component receives a function prop that returns a React element, giving the component owner control over what gets rendered.

\`\`\`tsx
// Example of a Toggle component using render props
interface ToggleProps {
  initial?: boolean;
  children: (state: { on: boolean; toggle: () => void }) => React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ initial = false, children }) => {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn(prev => !prev);
  
  return <>{children({ on, toggle })}</>;
};

// Usage
function App() {
  return (
    <Toggle>
      {({ on, toggle }) => (
        <div>
          <button onClick={toggle}>{on ? 'Turn Off' : 'Turn On'}</button>
          <div>{on ? 'The switch is on' : 'The switch is off'}</div>
        </div>
      )}
    </Toggle>
  );
}
\`\`\`

## Custom Hooks for Logic Reuse

Custom hooks enable sharing stateful logic between components without changing their structure.

\`\`\`tsx
// Custom form hook
function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset,
    setValues,
    setErrors
  };
}

// Usage
function SignupForm() {
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur 
  } = useForm({ email: '', password: '' });
  
  // Form implementation
}
\`\`\`

## The Context Module Pattern

For global state that doesn't change frequently, the Context Module pattern provides a clean way to structure your code.

\`\`\`tsx
// auth-context.tsx
interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    status: 'idle',
    error: null
  });
  
  // Implementation of login, logout, etc.
  
  const value = {
    ...state,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export both the provider and the hook
export { AuthProvider, useAuth };
\`\`\`

## State Machines for Complex State

For components with complex state transitions, state machines provide a more predictable way to manage state.

\`\`\`tsx
import { createMachine, assign, interpret } from 'xstate';

const formMachine = createMachine({
  id: 'form',
  initial: 'idle',
  context: {
    data: {},
    errors: {}
  },
  states: {
    idle: {
      on: {
        SUBMIT: 'submitting'
      }
    },
    submitting: {
      invoke: {
        src: 'submitForm',
        onDone: {
          target: 'success',
          actions: assign({ data: (_, event) => event.data })
        },
        onError: {
          target: 'error',
          actions: assign({ errors: (_, event) => event.data })
        }
      }
    },
    success: {
      on: {
        RESET: {
          target: 'idle',
          actions: 'resetForm'
        }
      }
    },
    error: {
      on: {
        SUBMIT: 'submitting'
      }
    }
  }
});

// Usage with React
function Form() {
  const [state, send] = useMachine(formMachine, {
    services: {
      submitForm: async (context, event) => {
        // API call implementation
      }
    },
    actions: {
      resetForm: assign({
        data: {},
        errors: {}
      })
    }
  });
  
  // Form implementation
}
\`\`\`

## Conclusion

These advanced React patterns give you a powerful set of tools to manage component complexity in large applications. By selecting the right pattern for each use case, you can create more maintainable, flexible, and expressive components.

Remember, patterns should solve problems, not create them. Always consider the complexity trade-off when implementing these patterns. Sometimes a simple component is still the best solution.

In future articles, I'll explore how to combine these patterns effectively and when to apply each one.`
  },
];

// Helper function to get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get featured posts
export const getFeaturedPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};
