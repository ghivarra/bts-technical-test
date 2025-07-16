<script setup lang="ts">

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue';
import { fetchApi } from '@/lib/common';
import type { AxiosResponse } from 'axios';
import Label from '@/components/ui/label/Label.vue';
import { Plus } from 'lucide-vue-next';

const emit = defineEmits(['insert'])

const props = defineProps<{
    id: number,
    reloadData: () => void
}>()

const form = ref({
    itemName: ''
})

const sendForm = () => {

    const input = JSON.parse(JSON.stringify(form.value))
    const axios = fetchApi(true)
    axios.post(`checklist/${props.id}/item`, input)
        .then((response: AxiosResponse) => {
            const res = response.data
            alert(res.message)
            props.reloadData()
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
    <Dialog>
        <DialogTrigger :as-child="true">
            <Button type="button" variant="default">
                <Plus class="text-white" />
                Tambah
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Tambah Item Checklist</DialogTitle>
                <DialogDescription>
                    Tambahkan item checklist di sini dengan nama.
                </DialogDescription>
            </DialogHeader>
            <section>
                <div class="grid gap-2">
                    <Label for="name" class="mb-2">Nama</Label>
                    <Input v-model="form.itemName" id="name" type="text" placeholder="Nama" required />
                </div>
            </section>
            <DialogFooter>
                <DialogClose :as-child="true">
                    <Button @click.prevent="sendForm()" type="submit">Simpan Perubahan</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>