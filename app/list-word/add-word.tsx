import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useWordStore } from '@/stores/useListWord'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    english_word: z.string(),
    vietnamese_word: z.string()
})
export default function AddWord() {
    const { addWord } = useWordStore()
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
        <Card className='dark:bg-black dark:border-dark-border-button'>
            <CardHeader>
                <CardTitle>Add new word</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="english_word"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>English Word</FormLabel>
                                    <FormControl>
                                        <Input placeholder="English Text" {...field} className='dark:bg-black dark:border-dark-border-button'/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vietnamese_word"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>VietNam Word</FormLabel>
                                    <FormControl>
                                        <Input placeholder="VietNam Text" {...field} className='dark:bg-black dark:border-dark-border-button'/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
