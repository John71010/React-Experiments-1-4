import { render, screen } from "@testing-library/react";
import Calendar from "./Calendar";

test("renders calendar heading", () => {

  render(
    <Calendar
      events={[]}
      onEventClick={() => {}}
    />
  );

  expect(
    screen.getByText("Post Calendar")
  ).toBeInTheDocument();

});