import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import SearchBox from "./SearchBox";

afterEach(cleanup);

const destinationSetup = (setSearchFilter = () => {}) => {
  let searchFilter = {};
  const utils = render(
    <SearchBox searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
  );
  const input = utils.getByLabelText("Destination");
  return {
    input,
    ...utils,
    searchFilter,
  };
};

test("Render destination in search box", () => {
  const { input } = destinationSetup();
  expect(input).toBeInTheDocument();
});

test("Trigger setSearchFilter when item selected", async () => {
  const setSearchFilter = jest.fn();
  const { input, getByText } = destinationSetup(setSearchFilter);

  fireEvent.change(input, { target: { value: "ne" } });
  await waitFor(() => fireEvent.click(getByText("New York")));

  expect(setSearchFilter).toHaveBeenCalledTimes(1);
});

test("Compare the selected value with input", async () => {
  const { input, getByText } = destinationSetup();
  fireEvent.change(input, { target: { value: "ne" } });
  await waitFor(() => fireEvent.click(getByText("New York")));
  expect(input.value).toBe("New York");
});
