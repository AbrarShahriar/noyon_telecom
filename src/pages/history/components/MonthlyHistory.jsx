import React from "react";
import HistoryCard from "./HistoryCard";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { useQuery } from "react-query";
import { getMonthlyHistory } from "../../../api/queries/history";
import { PageLoader } from "../../shared/SuspenseWrapper";
import Nothing from "../../shared/Nothing";

let d = new Date();

const MonthlyHistory = ({ setinVal, setoutVal, setselectedMonth }) => {
  const [startDate, setStartDate] = React.useState(new Date());

  const [dateQuery, setdateQuery] = React.useState(
    `${d.getMonth()}.${d.getFullYear()}`
  );

  const { isLoading, data: res } = useQuery(
    ["history", "list", dateQuery],
    () => getMonthlyHistory(dateQuery)
  );

  // @ts-ignore
  const DatePickerWrapper = React.forwardRef(({ value, onClick }, ref) => (
    <button className="date-picker-wrapper" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const handleDateClick = (date) => {
    setStartDate(
      // @ts-ignore
      date
    );
    setselectedMonth(dayjs(date).format("MMMM"));

    let formattedDate = { year: date.getFullYear(), month: date.getMonth() };

    setdateQuery(`${formattedDate.month}.${formattedDate.year}`);
  };

  React.useEffect(() => {
    if (res?.data) {
      let filteredIn = res?.data.filter((el) => el.historyType == "topup");
      let filteredOut = res?.data.filter((el) => el.historyType != "topup");

      let inInit = 0;
      filteredIn.forEach((el) => (inInit += Number(el.amount)));

      setinVal(inInit);

      let outInit = 0;
      filteredOut.forEach((el) => (outInit += Number(el.amount)));
      setoutVal(outInit);
    }
  }, [res]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <DatePicker
        selected={startDate}
        dateFormat={"MMMM yyyy"}
        showTwoColumnMonthYearPicker
        showMonthYearPicker
        showFullMonthYearPicker
        customInput={<DatePickerWrapper />}
        onChange={handleDateClick}
      />
      {res?.data.length >= 1 ? (
        res?.data
          .sort(
            (a, b) =>
              // @ts-ignore
              new Date(b.historyDate).getTime() -
              // @ts-ignore
              new Date(a.historyDate).getTime()
          )
          .map((el, i) => (
            <HistoryCard
              key={i}
              historyStatus={el.historyStatus}
              className={i == 0 ? "first-el" : ""}
              type={el.historyType}
              amount={el.amount}
              date={el.historyDate}
              transactionId={el.transactionId}
              desc={el.desc}
            />
          ))
      ) : (
        <Nothing title="No Transaction This Month!" />
      )}
    </>
  );
};
export default MonthlyHistory;
