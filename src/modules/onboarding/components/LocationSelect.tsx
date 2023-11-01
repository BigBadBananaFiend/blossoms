import { FC, ReactNode, useState } from 'react'

import { Virtuoso } from 'react-virtuoso'

import 'react-loading-skeleton/dist/skeleton.css'
import { useCountries } from '@/src/core/hooks/useCountries'
import { Input } from '@/src/libs/ui'
import { ICountry } from '@/src/core/api'
import Skeleton from 'react-loading-skeleton'

import style from './style.module.css'
import * as Popover from '@radix-ui/react-popover'

const SuggestionPopover = ({ children }: { children: ReactNode }) => {}

interface ICountrySelectProps {
    value: string
    setValue: (value: string | undefined) => void
    setCountry: (country: ICountry) => void
}

export const LocationSelect: FC<ICountrySelectProps> = ({
    value,
    setValue,
    setCountry,
}) => {
    const { isLoading, countries } = useCountries(value)
    const [isOpen, setIsOpen] = useState(true)

    if (isLoading) {
        ;<Skeleton className={style.skeleton} />
    }

    return (
        <div>
            <Input
                label={'Country'}
                value={value}
                onChange={(e) => {
                    setValue(e?.currentTarget.value)
                }}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <div
                    style={{
                        height: 400,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Virtuoso
                        data={countries}
                        itemContent={(_, city) => (
                            <p className="text-green">{city}</p>
                        )}
                    />
                </div>
            )}
        </div>
    )
    // const [country, setCountry] = useState<string>('')
    // const [city, setCity] = useState<string>('')

    // const [date, setDate] = useState<ICity[]>()

    // console.log('render')

    // const { isLoading: areCountriesLoading, data: countries } =
    //     useCountriesQuery()

    // const { isLoading: areCitiesLoading, data: cities } = useCitiesQuery({
    //     country: country,
    // })

    // const filteredCountries = useMemo(() => {
    //     if (!cities) {
    //         return
    //     }

    //     const map = new Map<string, ICity>()
    //     for (const city of cities) {
    //         map.set(city.name, city)
    //     }

    //     return Array.from(map.values()).splice(0, 100)
    // }, [cities])

    // if (areCitiesLoading || areCountriesLoading) {
    //     return [country, city].map((_, index) => (
    //         <Skeleton key={index} className={style.skeleton} />
    //     ))
    // }

    // return (
    //     <>
    //         <Select
    //             name="country"
    //             value={country}
    //             startAndorment={<Icons.Globe />}
    //             setValue={setCountry}
    //             valuePlaceholder={'Select country'}
    //             onValueChange={() => setCity('')}
    //         >
    //             {countries?.map((i, index) => (
    //                 <SelectItem value={i.iso2} itemText={i.name} key={index} />
    //             ))}
    //         </Select>
    //         <Select
    //             name="city"
    //             value={city}
    //             startAndorment={<Icons.City />}
    //             setValue={setCity}
    //             valuePlaceholder={'Select city'}
    //         >
    //             {filteredCountries?.map((i, index) => (
    //                 <SelectItem value={i.name} itemText={i.name} key={index} />
    //             ))}
    //         </Select>
    //     </>
    // )
}
