'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'

export default function AuthForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    const form = useForm()

    const handleSubmit = form.handleSubmit(async (data) => {
        console.log(data)
        setIsLoading(true)
        setMessage('')

        await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating API call

        setIsLoading(false)
        setMessage('Magic link sent! Check your email.')
        setEmail('')
    })

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <Card className="w-[350px]">
                {/* <SnowEffect /> */}
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to receive a magic link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...form.register('email')}
                                required
                            />
                        </div>
                        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            Send Magic Link
                        </Button>
                    </form>
                </CardContent>
                {message && (
                    <CardFooter>
                        <p className="text-sm text-center text-green-600 w-full">{message}</p>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}