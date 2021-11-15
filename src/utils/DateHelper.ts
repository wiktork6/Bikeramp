export function formatDay(day:number, startDate: Date): string{
        const month = startDate.toLocaleString('en-us', { month: 'short' });
        day = day+1;
        if(day === 1){
            return `${month}, ${day}st`
        } else if(day === 2){
            return `${month}, ${day}nd`
        } else if (day === 3){
            return `${month}, ${day}rd`
        }
        return `${month}, ${day}th`
    }

export function getDaysInMonth(year: number, month: number){
        return new Date(year, month, 0).getDate()
    }

export function getFirstDayOfCurrentMonth(){
        const currentDate = new Date();
        const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        return monthStartDate;
    }

export function getLastWeekDate(){
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate()-7);
        return currentDate;
    }


