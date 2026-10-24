export const formatDate = (
    value,
    dateFormat = "dd/MM/yyyy"
) => {
    if (!value) return "";

    // Handle date-only strings without timezone shifts.
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(
        String(value)
    );

    const date = match
        ? new Date(
              Number(match[1]),
              Number(match[2]) - 1,
              Number(match[3])
          )
        : new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const parts = {
        dd: String(date.getDate()).padStart(2, "0"),
        MM: String(date.getMonth() + 1).padStart(2, "0"),
        yyyy: String(date.getFullYear()),
    };

    return dateFormat.replace(
        /yyyy|MM|dd/g,
        (token) => parts[token]
    );
};