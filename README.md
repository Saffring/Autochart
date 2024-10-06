# Autochart - Healthcare Provider Application

Autochart is a Next.js-based web application designed to assist healthcare providers with patient charting and management. This application provides a user-friendly interface for viewing and managing patient information, vitals, allergies, and more.

## Features

- Patient information management
- Vital signs tracking and visualization
- Allergy management
- SMART on FHIR integration
- Responsive design for various devices

## Project Setup

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone [repository-url]
   cd autochart
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` or `yarn dev`: Starts the development server
- `npm run build` or `yarn build`: Builds the application for production
- `npm run start` or `yarn start`: Starts the production server
- `npm run lint` or `yarn lint`: Runs the linter to check for code quality issues

## Project Structure

```
autochart/
├── public/
├── src/
│   ├── app/
│   │   ├── callback/
│   │   ├── home/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── allergy/
│   │   ├── summary/
│   │   └── vitals/
│   ├── hooks/
│   └── lib/
├── .eslintrc.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Key Technologies and Libraries

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Recharts](https://recharts.org/) - Charting library for React
- [Lightweight Charts](https://www.tradingview.com/lightweight-charts/) - Financial charting library
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library

## SMART on FHIR Integration

This application integrates with FHIR (Fast Healthcare Interoperability Resources) using the SMART on FHIR standard. It includes custom hooks for handling SMART launch and callback processes, as well as for fetching and managing patient data.

### Key Hooks and Utilities

1. `useSmartLaunch` (src/hooks/useSmartLaunch.ts)
   - Handles the initial SMART on FHIR launch process
   - Fetches SMART configuration from the FHIR server
   - Initiates the authorization flow

2. `useSmartFhirCallbackHandler` (src/hooks/useSmartFhirCallbackHandler.tsx)
   - Manages the callback after authorization
   - Exchanges the authorization code for an access token
   - Stores token information in local storage

3. `usePatientData` (src/hooks/usePatientData.ts)
   - Fetches patient information using the FHIR API
   - Utilizes the access token obtained during authentication
   - Stores and provides patient data for use in the application

4. `useAllergiesData` (src/hooks/useAllergiesData.tsx)
   - Retrieves allergy information for the patient using FHIR API

5. `usePatientVitals` (src/hooks/usePatientVitals.tsx)
   - Fetches and manages patient vital signs data using FHIR API

6. `useObservationCreation` (src/hooks/useObservationCreation.ts)
   - Handles the creation of new observations (e.g., vital signs) using FHIR API

These hooks and utilities work together to provide a seamless integration with SMART on FHIR-enabled EHR systems, allowing the application to securely access and manage patient data in compliance with healthcare data standards.

## Contributing

Please read our contributing guidelines before submitting pull requests or opening issues.

## License

[Add your license information here]

---

For more information or support, please contact [your contact information or support channels].
