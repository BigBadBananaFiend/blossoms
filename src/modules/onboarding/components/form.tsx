'use client'

import { Input } from '@/src/libs/ui'
import { Select } from '@/src/libs/ui/select/Select'
import { SelectGroup } from '@/src/libs/ui/select/SelectGroup'
import { SelectItem } from '@/src/libs/ui/select/SelectItem'
import { FC } from 'react'

export const OnboardingForm: FC = () => {
    return (
        <div>
            <h3>Tell us about yourself</h3>
            <Input label="Name" />
            <Select valuePlaceholder="Country">
                <SelectGroup label="Idk">
                    <SelectItem
                        itemText="Hello"
                        textValue="Hello"
                        value="one"
                    />
                    <SelectItem itemText="Bye" textValue="Bye" value="two" />
                </SelectGroup>
            </Select>
        </div>
    )
}
