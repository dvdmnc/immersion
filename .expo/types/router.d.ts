/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/AvisPage` | `/(tabs)/details` | `/(tabs)/detailsPage` | `/(tabs)/menuPage` | `/AvisPage` | `/_sitemap` | `/details` | `/detailsPage` | `/menuPage`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
