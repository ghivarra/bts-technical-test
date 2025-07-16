<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import SidebarInset from '@/components/ui/sidebar/SidebarInset.vue';
import SidebarProvider from '@/components/ui/sidebar/SidebarProvider.vue';
import SidebarTrigger from '@/components/ui/sidebar/SidebarTrigger.vue';
import { fetchApi } from '@/lib/common';
import type { CheckList } from '@/types/type';
import type { AxiosResponse } from 'axios';
import { ref } from 'vue';
import { CheckIcon, Trash2 } from 'lucide-vue-next';
import CardContent from '@/components/ui/card/CardContent.vue';
import Button from '@/components/ui/button/Button.vue';
import ItemAddDialog from '@/dialog/ItemAddDialog.vue';
import { useRouter } from 'vue-router';
import ChecklistAddDialog from '@/dialog/ChecklistAddDialog.vue';


const router = useRouter()

const checklists = ref<CheckList[]>([])

// fetch data
const getAllChecklist = () => {
    const axios = fetchApi(true)
    axios.get('/checklist')
        .then((response: AxiosResponse) => {
            const res = response.data
            checklists.value = res.data as CheckList[]
        })
        .catch((res) => {
            console.warn(res)
            if (typeof res.response.data !== 'undefined') {
                alert(res.response.data.message)
            }
        }) 
}

const deleteChecklistItem = (id: number, itemID: number) => {
    const axios = fetchApi(true)
    axios.delete(`/checklist/${id}/item/${itemID}`)
        .then((response: AxiosResponse) => {
            const res = response.data
            alert(res.message)
            getAllChecklist()
        })
        .catch((res) => {
            console.warn(res)
            if (typeof res.response.data !== 'undefined') {
                alert(res.response.data.message)
            }
        }) 
}

getAllChecklist()

</script>

<template>
    <SidebarProvider>
        <SidebarInset>
            <header class="flex h-16 shrink-0 items-center gap-2 border-b">
                <div class="flex items-center gap-2 justify-between w-full px-3">
                    <SidebarTrigger />
                    <Button @click.prevent="router.push({ path: '/' })" type="button" variant="outline">
                        Logout
                    </Button>
                </div>
            </header>
            <div class="flex flex-1 flex-col gap-4 p-4 pt-6">

                <div class="mb-4">
                    <ChecklistAddDialog :reloadData="getAllChecklist"></ChecklistAddDialog>
                </div>

                <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card v-for="(checklist, key) in checklists" :key="key">
                        <CardHeader>
                            <div class="flex justify-between items-center">
                                <CardTitle contenteditable="false">{{ checklist.name }}</CardTitle>
                                <CheckIcon v-show="checklist.checklistCompletionStatus" class="text-green-600 "></CheckIcon>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div class="mb-6">
                                <div v-for="(item, n) in checklist.items" :key="n" class="flex mb-3">
                                    <div class="flex justify-between w-full items-center">
                                        <div>
                                            <input :for="`check_${key}`" type="checkbox" :checked="item.itemCompletionStatus">
                                            <label :for="`check_${key}`" class="ml-4">{{ item.name }}</label>
                                        </div>
                                        <Button @click.prevent="deleteChecklistItem(checklist.id, item.id)" type="button" class="rounded-full" variant="destructive" size="sm">
                                            <Trash2 class="text-white" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <ItemAddDialog :id="checklist.id" :reloadData="getAllChecklist" />
                        </CardContent>
                    </Card>
                </div>
            </div>
    </SidebarInset>
  </SidebarProvider>
</template>