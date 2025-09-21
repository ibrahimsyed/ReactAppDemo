export const showErrors = (
    errors: any,
    setError: any,
) => {
    let index = 0;
    for (var key in errors) {
        //console.log(errors[key])
        setError(
            errors[key].key,
            { type: "custom", message: errors[key].messages[0] },
            //{ shouldFocus: index === 0 },
        )
        index++
    }
}