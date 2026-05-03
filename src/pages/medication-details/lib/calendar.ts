export const openGoogleCalendar = (title: string, description: string, location: string, startDate: Date, endDate: Date) => {
    const formatDate = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        details: description,
        dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
        location: location
    });

    const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
    window.open(url, '_blank');
};
