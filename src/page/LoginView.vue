<script setup lang="ts">

import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const registerPage = () => {
    router.push({
        path: '/register'
    })
}

</script>

<template>
  <div class="p-4 w-dvw h-dvh flex items-center">
    <Card class="mx-auto max-w-sm min-w-[380px]">
        <CardHeader>
            <CardTitle class="text-2xl">Login</CardTitle>
            <CardDescription>
                Masuk menggunakan username dan password
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="username" class="mb-2">Username</Label>
                    <Input id="username" type="text" placeholder="@username" required />
                </div>
                <div class="grid-gap-2 mb-6">
                    <div class="flex items-center mb-4">
                        <Label for="password">Password</Label>
                    </div>
                    <Input id="password" type="password" placeholder="*********" required />
                </div>
                <Button type="submit">
                    Login
                </Button>
            </div>
            <div class="mt-4 text-center text-sm">
                <span>
                    Belum punya akun?
                </span>
                <Button @click.prevent="router.push({ path: '/register' })" class="p-1 font-bold" variant="link">Daftar Di Sini</Button>
            </div>
        </CardContent>
    </Card>
  </div>
</template>