import s from "./TimeModelValueView.module.css";
import { TimerValue } from "../../../../../src";

interface TimeModelValueViewProps {
  title: string;
  description: string;
  value: TimerValue;
}

export const TimeModelValueView: React.FC<TimeModelValueViewProps> = ({
  title,
  description,
  value,
}) => {
  return (
    <div className={s.wrap}>
      <div className={s.title}>{title}</div>
      <div className={s.description}>{description}</div>

      <div className={s.content}>
        <div className={s.state}>{value.state}</div>

        <div className={s.units}>
          <div className={s.unit}>
            <div className={s.unitName}>Days</div>
            <div className={s.unitValue}>{value.d}</div>
          </div>

          <div className={s.unit}>
            <div className={s.unitName}>Hours</div>
            <div className={s.unitValue}>{value.h}</div>
          </div>

          <div className={s.unit}>
            <div className={s.unitName}>Minutes</div>
            <div className={s.unitValue}>{value.m}</div>
          </div>

          <div className={s.unit}>
            <div className={s.unitName}>Seconds</div>
            <div className={s.unitValue}>{value.s}</div>
          </div>

          <div className={s.unit}>
            <div className={s.unitName}>Milliseconds</div>
            <div className={s.unitValue}>{value.ms}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
