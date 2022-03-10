import { render } from "@testing-library/react";
import App from "./Main";

test("Main Header Rendered", async () => {
  const { getByText } = render(<App />);
  expect(getByText("Hotels")).toBeInTheDocument();
});
