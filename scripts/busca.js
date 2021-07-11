($(document).ready(function(){
	//Remove a tela de pré carregamento
	$(".preloader-wrapper").css("display", "none");
	$(".progress").css("display", "none");

	var Private_Key = "462a528bc246f893ae51f3e9d45fd9473c5c9dfc"; //minha chave
	var Public_key = "75f679cbbfb8b82b98bd4c46893e3a8d"; //chave publica
	var ts = 0;
	var hash = hex_md5(ts+Private_Key+Public_key); //gerador de md5
	var url_characters = "https://gateway.marvel.com:443/v1/public/characters";

	$("#execute").click(function(){
		var character_selection = $("#character").val();
		$.ajax({
			url : url_characters,
			data : {
				apikey: Public_key,
				ts : ts,
				hash : hash,
				name : character_selection
			},
			type : "GET",
			dataType : "JSON",
			contentType : "application/json",
			beforeSend : function(){
				$(".preloader-wrapper").css("display", "block");
				$(".progress").css("display", "block");
				$("#img_container").css("display", "none");
			},
			success : function(data_recieved){
				//Add display depois do preload
				$(".preloader-wrapper").css("display", "none");
				$(".progress").css("display", "none");
				$("#img_container").css("display", "block");
				//Atribuição de dados
				var definition_data = data_recieved.data.results[0];
				var image_character = definition_data.thumbnail.path+"."+definition_data.thumbnail.extension;
				var description = definition_data.description;
				var name = definition_data.name;
				var link_externo_marvel = definition_data.urls[0].url;
				
				console.log(data_recieved.data.results[0]);
				//Add imagem
				$("#img_container").removeAttr("src");
				$("#img_container").attr("src", image_character);
				//Add nome
				$("#nome_heroi").text(name);
				//Link para site da marvel
				$("#descricao_heroi").text(description);
				$("#link_externo_marvel").attr("href", link_externo_marvel);
				
			},
		})
	})
}))