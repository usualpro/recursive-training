export const getDatesBetweenDates = (startDate, endDate) => {
    let now = startDate.clone(),
      dates = [];
  
    while (now.isSameOrBefore(endDate)) {
      dates.push(now.clone());
      now.add(1, "d");
    }
    return dates;
  };
  