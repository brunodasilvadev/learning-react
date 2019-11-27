import { useState, useEffect, useCallback } from 'react'
import useUndo from 'use-undo'
import { useDebouncedCallback } from 'use-debounce'

export default function useDebouncedUndo(timeout = 200) {
    const [content, setInput] = useState('')
    const [undoContent, { set: setContent, ...undoRest }] = useUndo('')
    const [setDebounce, cancelDebounce] = useDebouncedCallback(
        (value) => {
            setContent(value)
        },
        timeout
    )
    const setter = useCallback(function setterFn(value) {
        setInput(value)
        setDebounce(value)
    }, [setInput, setDebounce])

    useEffect(() => {
        cancelDebounce()
        setInput(undoContent.present)
    }, [cancelDebounce, undoContent])

    return [content, setter, undoRest]
}