<template>
    <div class="search">
        <div class="search-field">
            <input type="text" class="form-control" placeholder="Search for Photo">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'search',
        props: {
            value: {
                default: ''
            },
            name: {
                default: ''
            }
        },
        data() {
            return {
                searchTerm: this.value
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="scss" scoped>
.search {
    background: blue;
    min-height: 400px;
}
</style>