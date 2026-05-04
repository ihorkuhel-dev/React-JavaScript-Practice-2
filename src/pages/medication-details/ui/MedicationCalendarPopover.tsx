import { Clock2Icon } from "lucide-react"
import { Calendar } from "@/shared/ui/calendar"
import { Card, CardContent, CardFooter } from "@/shared/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Button } from "@/shared/ui/button"
import { CalendarIcon } from "@/shared/assets/CalendarIcon.tsx"
import {useState, memo} from "react";

function combineDateAndTime(date: Date, timeString: string): Date {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, seconds || 0, 0);
  return newDate;
}

export const MedicationCalendarPopover = memo(function MedicationCalendarPopover({ onAdd }: { onAdd: (start: Date, end: Date) => void }) {
  const [date, setDate] =  useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("11:00")
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    if (!date) return;
    const start = combineDateAndTime(date, startTime);
    const end = combineDateAndTime(date, endTime);
    onAdd(start, end);
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} >
      <PopoverTrigger asChild>
        <Button className="flex-1 max-sm:flex-initial" variant="secondary">
          <CalendarIcon color="currentColor" className="mr-1" /> Add to Calendar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[105]" align="start">
        <Card size="sm" className="mx-auto w-fit border-0 shadow-none">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="p-3 bg-mywhite"
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4 border-t p-4 bg-mywhite">
            <FieldGroup className="flex-row gap-3">
              <Field>
                <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="time-from"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  <InputGroupAddon>
                    <Clock2Icon className="size-4 text-mygrey" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="time-to">End Time</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="time-to"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  <InputGroupAddon>
                    <Clock2Icon className="size-4 text-mygrey" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
            <Button onClick={handleSave} className="w-full">Create Event</Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
});
