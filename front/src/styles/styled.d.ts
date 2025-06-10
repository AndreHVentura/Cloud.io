import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    text: string;
    backgroundGradient: string;
    mainBackground: string;
    body: string;
    widgetBackground: string;
  }
}