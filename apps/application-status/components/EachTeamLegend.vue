<template>
    <div class="Main_Legend">
        <h1 class="Main_Legend-heading">Total Points :</h1>
        <p>The cumulative count of points associated with tickets in the current sprint.</p>
        <h1 class="Main_Legend-heading">Total closed releases :</h1>
        <p>The total number of releases in the closed state, categorized by team.</p>
        <h1 class="Main_Legend-heading">Total Issues :</h1>
        <p>The aggregate count of issues within the current sprint.</p>
        <h1 class="Main_Legend-heading">Total Prod Defects :</h1>
        <p>The number of defects labeled as Prod Defects.</p>
        <h1 class="Main_Legend-heading"> Scope Change :</h1>
        <p>Tickets that are moved to the sprint backlog after the sprint has already started.</p>
        <h1 class="Main_Legend-heading"> Scope Change Issues :</h1>
        <p>Tickets that have been added to the sprint backlog after the sprint has already started, indicating changes in scope.</p>
    </div>
</template>
<style>
.Main_Legend{
    &-heading{
    font-weight: 600;}
}
</style>