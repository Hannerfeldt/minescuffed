/* top, left, bottom, right */
const getCordsforAdjecent = (x, y, i) => {
    if (i % 2 == 0) return { x, y: y + (i - 1) }
    else return { x: x + (i - 2), y }
}

export { getCordsforAdjecent as default }
