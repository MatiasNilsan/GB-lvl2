export const Search = {
    data() {
        return {
            searchLine: '',
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent=''>
                <input v-model="searchLine" type="text" class="search-field">
                <button class="btn-search" type="sumbit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
}