import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useWordStore } from '$root/stores/useListWord'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Loading from '@/loading'

const formSchema = z.object({
    english_word: z.string(),
    vietnamese_word: z.string()
})
export default function AddWord() {
    const { addWord, loadingInsert } = useWordStore()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            english_word: "",
            vietnamese_word: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        addWord(values.english_word, values.vietnamese_word)
    }
    return (
        <Card className='bg-transparent dark:border-dark-border-button'>
            <CardHeader>
                <CardTitle className='text-white'>Add new word</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {loadingInsert ? <Loading /> : <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="english_word"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-white'>English Word</FormLabel>
                                    <FormControl>
                                        <Input placeholder="English Text" {...field} className='dark:bg-black dark:border-dark-border-button' />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vietnamese_word"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-white'>VietNam Word</FormLabel>
                                    <FormControl>
                                        <Input placeholder="VietNam Text" {...field} className='dark:bg-black dark:border-dark-border-button' />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='bg-white text-black'>Submit</Button>
                    </form>
                </Form>
                }
            </CardContent>
        </Card>
    )
}
