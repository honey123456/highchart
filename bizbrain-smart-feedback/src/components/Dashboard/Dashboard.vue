<template>
    <div class="hello">
        <div class="container-fluid">
            <div class="row bsf-row">
                <div class="col-md-3">
                    <div class="bsf-card" style="min-height:calc(100vh - 48px)">
                        <ul class="bsf-dashboard-sidebar-listing">
                            <li>
                                <p class="bsf-label">Toilet Id:</p>
                                <h3>{{deviceId}}</h3>
                            </li>
                            <li>
                                <p class="bsf-label">Date:</p>
                                <date-picker v-model="time1" range format="DD-MM-YYYY" style="width: 100% !important;"
                                             :placeholder="dateRangePlaceHolder" :shortcuts="shortcuts"
                                             @change="onDateChange()" lang="en"></date-picker>
                            </li>
                            <li>
                                <p class="bsf-label">City:</p>
                                <h3>{{deviceCity}}</h3>
                            </li>
                            <li>
                                <p class="bsf-label">Location:</p>
                                <h3>{{deviceLocation}}</h3>
                            </li>
                            <li>
                                <div class="bsf-dashboard-map" :id="mapName"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-12" style="">
                            <div class="bsf-card">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div id="chart"></div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="text-center">
                                            <div class="test" v-for="item in voteArray" v-bind:key="item.value">
                                                <div class="a">
                                                    <div class="bsf-vote-categories" :style="'background-color:' + buttonColor[item.key] + ' !important'"></div>
                                                </div>
                                                <div class="b">
                                                    <p class="text-center">{{item.value}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="bsf-card">
                                <div class="bsf-dashboard-total-feedback">
                                    <div class="row" v-for="data in eachVoteDetail" v-bind:key="data.id" :style="'background-color:' + buttonColor[data.vote] + '30 !important;border-bottom: 1px solid #f8f8f8;margin:0;'">
                                        <div class="col-xs-4 text-left">
                                            <div class="bsf-dashboard-vote-type">{{buttonNames[data.vote]}}</div>
                                        </div>
                                        <div class="col-xs-8 text-right">
                                            <p class="bsf-dashboard-vote-time">{{moment(data.created_at *
                                                1000).format('HH:mm:ss DD-MMM-YYYY')}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript" src="../Dashboard/Dashboard.js"></script>
