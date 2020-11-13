"use strict";

{
	class User { //親クラス
		constructor(tag, type) {
			this.tag = tag;
			this.type = type;
			this._img = document.createElement("img");

			this._img.addEventListener("click", () => {
				this.click();
			});
		}

		addImage() { //画像ソースの追加
			this._img.src = "img/" + this.type + ".png";
		}

		addHTML() { //HTMLに生成したタグの追加
			this.tag.appendChild(this._img);
		}

		click() { //クリックされた時の処理
			if (!RESET_BUTTON.classList.contains("hidden")) { //何度もクリックできないようにする
				return;
			}

			clearTimeout(dealer._timeoutId);
			RESET_BUTTON.classList.remove("hidden");
			this.result();
		}

		result() { //じゃんけんの結果判定
			let _dealerType = dealer.type[dealer._rdNum];

			switch (this.type) {
				case "rock": //グーをクリックした場合
					if (_dealerType === "rock") {
						RESULT.textContent = "引き分け";
					} else if (_dealerType === "scissors") {
						RESULT.textContent = "勝ち！";
					} else {
						RESULT.textContent = "負け";
					}
					break;

				case "scissors": //チョキをクリックした場合
					if (_dealerType === "rock") {
						RESULT.textContent = "負け";
					} else if (_dealerType === "scissors") {
						RESULT.textContent = "引き分け";
					} else {
						RESULT.textContent = "勝ち！";
					}
					break;

				case "paper": //パーをクリックした場合
					if (_dealerType === "rock") {
						RESULT.textContent = "勝ち！";
					} else if (_dealerType === "scissors") {
						RESULT.textContent = "負け";
					} else {
						RESULT.textContent = "引き分け";
					}
					break;

				default:
					console.log("タイプなし");
					break;
			}
		}
	}

	class Dealer extends User { //子クラス:ディーラー
		constructor(tag, type) {
			super(tag, type);

			this._rdNum = Math.floor(Math.random() * type.length);
			this._timeoutId;

			this.addImage();
			this.addHTML();
		}

		//オーバーライド
		addImage() { //画像ソースの追加
			this._img.src = "img/" + this.type[this._rdNum] + ".png";
		}

		shuffleImage() { //ランダムにじゃんけん画像ソースの入れかえ
			this._rdNum = Math.floor(Math.random() * this.type.length);
			this.addImage();

			this._timeoutId = setTimeout(() => {
				this.shuffleImage();
			}, 20); //50fps

		}

		//オーバーライド
		click() { return; } //クリックしても何も起こらない
	}

	class Player extends User { //子クラス:プレイヤー
		constructor(tag, type) {
			super(tag, type);

			this.addImage();
			this.addHTML();
		}
	}

	const DEALER_TAG = document.querySelector(".dealer"); //タグの取得
	const PLAYER_TAG = document.querySelector(".player"); //タグの取得
	const RESET_BUTTON = document.getElementById("resetButton"); //タグの取得
	const RESULT = document.querySelector(".result"); //タグの取得

	const JANKEN_TYPE = ["rock", "scissors", "paper"]; //じゃんけんタイプの配列

	init();

	const dealer = new Dealer(DEALER_TAG, JANKEN_TYPE) //ディーラーのインスタンスの生成

	let player = new Array(3);
	for (let i = 0; i < player.length; i++) {
		player[i] = (new Player(PLAYER_TAG, JANKEN_TYPE[i])); //プレイヤーのインスタンスの生成
	}

	dealer.shuffleImage();

	RESET_BUTTON.addEventListener("click", () => { //リセットボタンが押された時の処理
		dealer.shuffleImage();
		init();
	});

	function init() { //初期化
		RESULT.textContent = "";
		RESET_BUTTON.classList.add("hidden");
	}
}




