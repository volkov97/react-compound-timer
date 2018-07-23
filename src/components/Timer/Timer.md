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
