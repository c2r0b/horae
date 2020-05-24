import React, { useState, useEffect } from "react";

import moment from "moment";

export default (props) => {
  const [time, setTime] = useState("00:00:00");
  const [running, setRunning] = useState(false);
  const [trigger, setTrigger] = useState("manual");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/processes", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
      })
      .then(response => response.json())
      .then(processes => {
        if (processes.filter(p => {
          return p.name === "atom";
        }).length) {
          setTrigger("Atom");
          setRunning(true);
        }
        else {
          setTrigger("manual");
          stop();
        }
      });

      if (running) {
        setTime(time => {
          let parts = time.split(":");
          parts[2]++;
          if (parts[2] >= 60) {
            parts[2] = 0;
            parts[1]++;
            if (parts[1] >= 60) {
              parts[1] = 0;
              parts[0]++;
            }
          }
          let string = "";
          for (let part of parts) {
            if (part.toString().length === 1) {
              part = "0" + part;
            }
            string += part + ":";
          }
          return string.slice(0, -1);
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const stop = () => {
    if (time !== "00:00:00") {
      const list = history;
      list.unshift(time);
      setHistory(list);

      setRunning(false);
      setTime("00:00:00");
    }
  };

  return (
    <aside>
      <div className="commands">
        <ul>
          <li
            className={ (!running && trigger === "manual") ? "" : "disabled"}
            onClick={ () => (trigger === "manual") ? setRunning(true) : {} }>
            <span>Play</span>
          </li>
          <li
            className={ (running && trigger === "manual") ? "" : "disabled"}
            onClick={ () => (trigger === "manual") ? setRunning(false) : {} }>
            <span>Pause</span>
          </li>
          <li
            className={ (trigger === "manual" && running) ? "" : "disabled"}
            onClick={ (trigger === "manual") ? stop : () => {} }>
            <span>Stop</span>
          </li>
        </ul>
      </div>
      <div className="project">
        <select>
          <option>Project 1</option>
        </select>
      </div>
      <div className="date">
        { moment().format("MMMM Do YYYY") }
      </div>
      <div className="clock">
        { time }
      </div>
      <div className="trigger">
        <img src="file:///snap/atom/252/usr/share/atom/atom.png" alt="atom" />
        <span>{ trigger }</span>
      </div>
      <div className="info">
        <ul>
          {
            history.map((t, i) => {
              return (<li key={ i }>{ t }</li>);
            })
          }
        </ul>
      </div>
    </aside>
  );
};
