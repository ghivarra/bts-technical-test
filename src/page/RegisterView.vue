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
import { ref } from 'vue';
import { fetchApi, setCookie } from '@/lib/common';
import type { AxiosResponse } from 'axios';

const router = useRouter()

const form = ref({
    username: '',
    password: '',
    email: '',
})

const sendForm = () => {

    const input = JSON.parse(JSON.stringify(form.value))
    const axios = fetchApi(false)
    axios.post('register', input)
        .then((response: AxiosResponse) => {
            const res = response.data
            alert(res.data.message)
            router.push({ path: '/' })
        })
        .catch((res) => {
            console.warn(res)
            if (typeof res.response.data !== 'undefined') {
                alert(res.response.data.message)
            }
        }) 
}

</script>

<template>
  <div class="p-4 w-dvw h-dvh flex items-center">
    <Card class="mx-auto max-w-sm min-w-[380px]">
        <CardHeader>
            <CardTitle class="text-2xl">Daftar</CardTitle>
            <CardDescription>
                Daftar menggunakan username, email, dan password
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="username" class="mb-2">Username</Label>
                    <Input v-model="form.username" id="username" type="text" placeholder="@username" required />
                </div>
                <div class="grid gap-2">
                    <Label for="email" class="mb-2">Email</Label>
                    <Input v-model="form.email" id="email" type="text" placeholder="email@example.com" required />
                </div>
                <div class="grid-gap-2 mb-6">
                    <div class="flex items-center mb-4">
                        <Label for="password">Password</Label>
                    </div>
                    <Input v-model="form.password" id="password" type="password" placeholder="*********" required />
                </div>
                <Button @click.prevent="sendForm()" type="submit">
                    Daftar
                </Button>
            </div>
            <div class="mt-4 text-center text-sm">
                Sudah punya akun? <Button @click.prevent="router.push({ path: '/' })" class="p-1 font-bold" variant="link">Login</Button>
            </div>
        </CardContent>
    </Card>
  </div>
</template>