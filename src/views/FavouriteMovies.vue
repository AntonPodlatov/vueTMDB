<template>
  <v-container>

    <v-alert dismissible elevation="2" text type="error" :value="cantLoadData">
      data loading problems
    </v-alert>

    <v-row v-if="movies.length !== 0" class="justify-center">
      <v-col v-for="movie in movies" cols="6" md="2" :key="movie.id">
        <movie-card :movie-url="'movie/'" :movie="movie"
                    :api-images-url="service.smallImagesUrl">
        </movie-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <span class="white--text text-h5">There's nothing here..</span>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
import MovieCard from "@/components/MovieCard";

export default {
  name: "FavouriteMovies",

  components: {
    MovieCard
  },

  data() {
    return {
      storageService: this.$store.state.storageService,
      service: this.$store.state.service,
      movies: [],
      cantLoadData: false
    };
  },

  created() {
    this.createThis();
  },

  methods: {
    createThis() {
      this.movies = this.storageService.getFavourites();

      if (this.movies.length === 0) {
        return;
      }

      this.service.createMoviePage(this.movies[0].id).then(response => {
        if (response.status === 200) {
          this.cantLoadData = false;
        }
      }).catch(() => {
        this.cantLoadData = true;
      });
    }
  }
};
</script>