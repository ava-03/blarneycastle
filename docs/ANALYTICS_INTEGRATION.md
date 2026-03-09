# Vercel Web Analytics Integration

This document describes how Vercel Web Analytics has been integrated into the Blarney Castle Expo app.

## Overview

Vercel Web Analytics has been added to track visitor behavior and page views when the app is running on the web platform. The integration is platform-specific and only loads on web to avoid impacting native iOS/Android builds.

## Implementation

### Package Installation

The `@vercel/analytics` package (v1.6.1) has been added to the project dependencies:

```bash
npm install @vercel/analytics
```

### Code Integration

The Analytics component has been integrated into the root layout (`app/_layout.tsx`) with the following approach:

1. **Platform Detection**: The component uses React Native's `Platform` API to detect when the app is running on web
2. **Conditional Loading**: The Analytics module is only imported when `Platform.OS === "web"` 
3. **Conditional Rendering**: The Analytics component is only rendered when it's available (web platform)

```typescript
// Conditionally import Analytics component for web platform only
let Analytics: React.ComponentType | null = null;
if (Platform.OS === "web") {
  Analytics = require("@vercel/analytics/react").Analytics;
}

// In the component render:
{Analytics && <Analytics />}
```

This approach ensures:
- Zero impact on native mobile builds
- No unnecessary bundle size increase for iOS/Android
- Automatic analytics tracking when running on web

## Features

When the app runs on web, Vercel Analytics will automatically track:
- Page views
- Navigation between routes (via Expo Router)
- User engagement metrics
- Performance data

## Configuration

To enable analytics on Vercel:

1. Go to your Vercel dashboard
2. Select the project
3. Navigate to the **Analytics** tab
4. Click **Enable**

After deployment, you'll be able to view:
- Real-time visitor data
- Page view statistics
- User engagement metrics
- Geographic distribution
- Device and browser information

## Verification

After deploying to Vercel, you can verify the analytics are working by:

1. Opening the web version of your app
2. Opening browser DevTools (F12)
3. Going to the Network tab
4. Looking for requests to `/_vercel/insights/*`

If you see these requests, analytics is working correctly.

## Documentation

For comprehensive setup instructions across different frameworks, see the full guide:
- [Vercel Web Analytics Guide](./vercel-web-analytics-guide.md)

## Learn More

- [Official Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Custom Events](https://vercel.com/docs/analytics/custom-events)
- [Privacy & Compliance](https://vercel.com/docs/analytics/privacy-policy)
