<template>

<v-app id="inspire">
    
    
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="dark"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
               <span class="hidden-sm-and-down">MERACRM</span>
      </v-toolbar-title>
    
      <v-spacer></v-spacer>
     
        <v-text>hemraj.desai7007@gmail.com</v-text>
     
      <v-btn icon>
        <v-icon slot="badge" dark small>done</v-icon>
      <v-icon
        large
        color="grey lighten-1"
      >
        account_circle
      </v-icon>
      </v-btn> 
    </v-toolbar>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
    <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
        TASK-DETAIL
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Project-Title"
                ></v-text-field>
              </v-layout>
            </v-flex>
          <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn slot="activator" color="primary" dark>Select-Task</v-btn>
      <v-list>
        <v-list-tile :key="index" @click="">
          <v-list-tile-title>Coding</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :key="index" @click="">
          <v-list-tile-title>Testing</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :key="index" @click="">
          <v-list-tile-title>Database-Connection</v-list-tile-title>
        </v-list-tile>
         <v-list-tile :key="index" @click="">
          <v-list-tile-title>Design</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
         <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
                   <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
   </template>
   

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        
        {
          
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        }
        
      ]
    }),
    props: {
      source: String
    }
  }
</script>