### Forward Count

```jsx
<Timer>
    {({ d, h, m, s, ms }) => (
        <div>{d} {h} {m} {s} {ms}</div>
    )}
</Timer>
```

### Backward Count

```jsx
<Timer
    initialTime={55000}
    direction="backward"
>
    {({ d, h, m, s, ms }) => (
        <div>{d} {h} {m} {s} {ms}</div>
    )}
</Timer>
```

### Pause and Play Button

```jsx
<Timer
    initialTime={55000}
    direction="backward"
>
    {({ d, h, m, s, ms, timerState, pauseTimer, resumeTimer }) => (
        <div>
            <div>{d} {h} {m} {s} {ms}</div>
            <br />
            <div>{timerState}</div>
            <br />
            <div>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resumeTimer}>Resume</button>
            </div>
        </div>
    )}
</Timer>
```
