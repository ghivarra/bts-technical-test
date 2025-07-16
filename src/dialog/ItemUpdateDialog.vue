<script setup lang="ts">

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue';
import { fetchApi } from '@/lib/common';
import type { AxiosResponse } from 'axios';
import Label from '@/components/ui/label/Label.vue';
import { SquarePen } from 'lucide-vue-next';
import type { CheckListItem } from '@/types/type';

const emit = defineEmits(['insert'])

const props = defineProps<{
    id: number,
    item: CheckListItem
    reloadData: () => void
}>()

const form = ref({
    itemName: props.item.name
})

const sendForm = () => {

    const input = JSON.parse(JSON.stringify(form.value))
    const axios = fetchApi(true)
    axios.put(`checklist/${props.id}/item/rename/${props.item.id}`, input)
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
            <button class="py-1 text-xs px-2 text-white border bg-white rounded-full mr-2">
                <SquarePen class="text-black text-xs" width="16" />
            </button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update Item Checklist</DialogTitle>
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