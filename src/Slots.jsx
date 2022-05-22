import PropTypes from "prop-types";
import moment from "moment";
import business from "moment-business";
import { chunk } from "lodash";
import { observer } from "mobx-react-lite";

import { getDatesBetweenDates } from "./utils/getDatesBetweenDates";

/**
 * disregard summer holidays
 * this is a setting for moment-business-days
 */
moment.updateLocale("us", {
    holidays: ["07", "08"],
    holidayFormat: "MM"
});

/**
 * Recovery from the previous year
 * to the current to calculate the start date of the slots
 */
const start = moment(moment().subtract(1, "y").year().toString() + "-09-02");

/**
 * Recovery from the newt year
 * to the current to calculate the end date of the slots
 */
const end = moment(moment().add(1, "y").year().toString() + "-06-30");

/**
 * @param {
 *  options:{
 *    sessions: The number of slots to display over the period,
 *    day: The selected day of the slots (Monday, Tuesday, etc.)
 *    name: The name of the slots
 * }} props
 */

export const Slots = observer((props) => {
    const { options } = props;

    const { sessions, day } = options;

    /**
     * A date table without the summer holidays,
     * and containing only the selected day
     */
    const dateList = getDatesBetweenDates(start, end)
        .filter((c) => business.isWeekDay(c))
        .filter((c) => c.format("dddd") === day);

    /**
     * Total number of days available divided
     * by the number of slots desired
     */
    const repetitions = Math.round(dateList.length / options.sessions);

    /**
     * Dividing the array of all dates into several arrays
     */
    const chunked = chunk(dateList, repetitions).map((e) => e[0]);

    return (
        <>
            <div className="row gy-2 mb-2">
                {chunked.map((c, i) => (
                    <div className="col" key={i}>
                        <button className="w-100 btn btn-primary" disabled={c.isBefore(moment())}>
                            {c.format("DD/MM/YYYY")}
                        </button>
                    </div>
                ))}
            </div>
            <h3 className={"text-center"}>
                {dateList.length} business days ({day}) cut in {sessions} sessions
            </h3>
            <h5 className={"text-center"}>
                From {moment(start).format("MM/DD/YYYY")} to{" "}
                {moment(end).format("MM/DD/YYYY")}
            </h5>
        </>
    );
});

Slots.displayName = "Slots";

Slots.defaultProps = {
    options: {
        sessions: 2,
        day: "Monday",
        name: "javascript"
    }
};

Slots.propTypes = {
    sessions: PropTypes.number,
    day: PropTypes.string,
    name: PropTypes.string
};
